/**
 * 🌌 GÖK MEKANİĞİ VE UZAY KATMANLARI (küre görünümünün gerçekçilik çekirdeği)
 *
 * NE SORUNU ÇÖZÜYOR: Küre görünümü önce MapLibre'nin hazır çıktısıyla yetiniyordu
 * ve ortada "gezegen" hissini bozan üç kusur vardı:
 *
 *   1. GÜNEŞ DİYE BİR ŞEY YOKTU. Ekrandaki parlama MapLibre'nin atmosfer saçılma
 *      shader'ıydı; yönü stilin `light` özelliğinden geliyor, biz onu hiç
 *      tanımlamadığımız için MapLibre varsayılanı geçerliydi:
 *      `anchor: "viewport"` — yani ışık EKRANA çivili. Gezegen altından kayıyor,
 *      parlama kıpırdamıyordu. Astronomiyle hiçbir ilgisi yoktu.
 *   2. YILDIZLAR CSS'TİR. #globe'un `background-image`'ına serpilmiş 6 adet
 *      `radial-gradient` noktası, WebGL tuvalinin ARKASINDAKİ DOM katmanında,
 *      sayfa koordinatlarında duruyordu. Kameraya tepki vermeleri fizikî olarak
 *      imkânsızdı; üstelik `background-size` ile döşendikleri için aynı altı
 *      nokta gözle görülür bir ızgarada tekrarlıyordu.
 *   3. GÜNDÜZ/GECE SINIRI HİÇ YOKTU. Taban uydu görüntüsü baştan sona eşit
 *      aydınlıktı. Kenarlardaki kararma `fog-color`'dı — yani küre HER YÖNDE
 *      aynı anda kararıyordu. Aydınlatılmış bir küre için geometrik olarak
 *      imkânsız bir görüntü; sahteliği en çok bu belli ediyordu.
 *
 * TEŞHİSİN İNCE NOKTASI: sorun "kamera sabit, Dünya dönüyor" değildi. MapLibre'nin
 * küre projeksiyonunda kamera ZATEN sabit bir Dünya'nın çevresinde yörüngededir;
 * kaydırma `center`/`bearing` değiştirir, küre dünya uzayında döndürülmez. Kusur
 * şuydu: güneş ve yıldızlar DÜNYA UZAYINDA HİÇ DEĞİLDİ — biri görüntü uzayında
 * (`light.anchor: viewport`), öteki sayfa uzayında (CSS). Hatalı olan kameranın
 * hareketi değil, bu iki nesnenin REFERANS ÇERÇEVESİYDİ. Bu dosya ikisini de
 * gerçek gök koordinatlarına oturtur.
 *
 * ÜÇ PARÇA
 *
 *   GokMekanigi   Saf matematik: alt-güneş noktası, GMST, küre vektörleri ve
 *                 MapLibre `light.position` çevirimi. WebGL'e hiç dokunmaz.
 *   YildizKatmani Gerçek yıldız kataloğunu (bkz. data/yildiz_katalogu.js) gök
 *                 küresine çizer + prosedürel Samanyolu. Gezegen kameranın
 *                 altında dönerken yıldızlar gökte asılı kalır.
 *   GeceKatmani   Işın-küre kesişimiyle her piksel için güneş yükseltisini
 *                 hesaplar: gerçek terminatör, üç alacakaranlık basamağı,
 *                 gün batımı halkası ve NASA Black Marble şehir ışıkları.
 *
 * KOORDİNAT ÇERÇEVELERİ (kafa karışmasın diye tek yerde)
 *
 *   DÜNYA-SABİT  MapLibre'nin küre çerçevesi. Kaynaktan doğrulandı
 *                (globe_utils.ts · angularCoordinatesRadiansToVector):
 *                    x = sin(λ)·cos(φ),  y = sin(φ),  z = cos(λ)·cos(φ)
 *                Yani +Y kuzey kutbu, +Z (0°,0°) yönü. Dünya ile döner.
 *   GÖKSEL       Yıldızların ra/dec çerçevesi. Dünya-sabite çevirim:
 *                    λ_yıldız = ra − GMST,   φ_yıldız = dec
 *   VIEW         Kamera orijinde, −Z ileri (piksel birimli). MapLibre'nin
 *                atmosfer shader'ının çalıştığı uzay. Dünya-sabitten view'e
 *                dönüşüm, MapLibre'nin `light` zinciriyle BİREBİR aynıdır
 *                (bkz. dunyadanViewe) — aksi hâlde bizim terminatörümüz ile
 *                MapLibre'nin atmosfer parlaması birbirini tutmaz.
 */

// =========================================================================
// GÖK MEKANİĞİ — saf matematik
// =========================================================================
const GokMekanigi = {
  DER: Math.PI / 180,

  /**
   * ALT-GÜNEŞ NOKTASI: Güneş'in o anda tam tepede olduğu coğrafi koordinat.
   * Terminatör, alacakaranlık, yıldız çerçevesi ve ışık yönü — hepsi bu tek
   * noktadan (ve beraberinde dönen GMST'den) türer.
   *
   * HESAP `js/solar.js`'E DEVREDİLİR. Aynı formülü burada ikinci kez yazmak
   * sessiz bir sapma kaynağıdır: iki uygulamadan biri düzeltilir, öteki
   * düzeltilmez ve güneş ile terminatör birbirinden kayar. `Solar` ayrıca
   * Node'dan çalışıyor ve birim testi var (tools/solar_test.js) — doğruluğun
   * ölçüldüğü yer orası olsun.
   *
   * @returns {{lat:number, lng:number, decl:number, gmst:number}} derece
   */
  altGunesNoktasi(tarih) {
    return Solar.subsolarPoint(tarih);
  },

  /**
   * (boylam°, enlem°) → MapLibre küre birim vektörü (DÜNYA-SABİT çerçeve).
   * Formül MapLibre kaynağından alınmıştır; değiştirilmemeli.
   */
  yuzeyVektoru(lngDer, latDer) {
    const la = latDer * this.DER;
    const ln = lngDer * this.DER;
    const c = Math.cos(la);
    return [Math.sin(ln) * c, Math.sin(la), Math.cos(ln) * c];
  },

  /**
   * Alt-güneş noktasından MapLibre `light.position` değeri üretir.
   *
   * NEDEN BU KADAR DOLAMBAÇLI: MapLibre ışığı `[radial, azimuthal, polar]`
   * küresel üçlüsü olarak alıp `sphericalToCartesian` ile karteziyene çevirir,
   * sonra İŞARETİNİ TERS ÇEVİRİP (`lightPos = -cartesian`) güneş yönü olarak
   * kullanır (draw_sky.ts · getSunPos). Dolayısıyla istediğimiz güneş yönü S
   * için çözmemiz gereken denklem:  cartesian(position) = −S
   *
   * MapLibre'nin dönüşümü (util.ts · sphericalToCartesian), A = azimuthal+90:
   *     x = r·cos(A)·sin(P),   y = r·sin(A)·sin(P),   z = r·cos(P)
   * Tersi:
   *     P = acos(−S.z),   A = atan2(−S.y, −S.x),   azimuthal = A − 90°
   *
   * `radial` normalleştirme sonrası etkisiz; MapLibre varsayılanı korunur.
   */
  isikKonumu(lngDer, latDer) {
    const S = this.yuzeyVektoru(lngDer, latDer);
    const polar = Math.acos(Math.max(-1, Math.min(1, -S[2]))) / this.DER;
    const azim = Math.atan2(-S[1], -S[0]) / this.DER - 90;
    return [1.15, this._sar360(azim), polar];
  },

  /**
   * DÜNYA-SABİT vektörü VIEW uzayına taşır.
   *
   * Dönüş zinciri MapLibre'nin `light` zincirinin BİREBİR kopyasıdır
   * (draw_sky.ts · getSunPos, anchor === 'map' dalı):
   *     M = Rz(roll) · Rx(−pitch) · Rz(bearing) · Rx(lat) · Ry(−lng)
   * gl-matrix sağdan çarptığı için vektöre uygulanma sırası sağdan sola:
   * önce Ry(−lng), en son Rz(roll). Sıra bozulursa bizim terminatörümüz ile
   * MapLibre'nin atmosfer parlaması birbirinden kayar.
   */
  dunyadanViewe(v, tr) {
    let [x, y, z] = v;
    let c, s, a;

    a = -tr.center.lng * this.DER;                     // Ry(−lng)
    c = Math.cos(a); s = Math.sin(a);
    [x, z] = [x * c + z * s, -x * s + z * c];

    a = tr.center.lat * this.DER;                      // Rx(lat)
    c = Math.cos(a); s = Math.sin(a);
    [y, z] = [y * c - z * s, y * s + z * c];

    a = tr.bearingInRadians || 0;                      // Rz(bearing)
    c = Math.cos(a); s = Math.sin(a);
    [x, y] = [x * c - y * s, x * s + y * c];

    a = -(tr.pitchInRadians || 0);                     // Rx(−pitch)
    c = Math.cos(a); s = Math.sin(a);
    [y, z] = [y * c - z * s, y * s + z * c];

    a = tr.rollInRadians || 0;                         // Rz(roll)
    c = Math.cos(a); s = Math.sin(a);
    [x, y] = [x * c - y * s, x * s + y * c];

    return [x, y, z];
  },

  /**
   * Dünya-sabit → view 3×3 matrisi. Sütunları, birim vektörlerin dönüşümüdür;
   * böylece zinciri iki kere (bir vektör, bir matris için) yazmak gerekmiyor.
   * GLSL `mat3` yapıcısı da sütun sıralı olduğu için dizi doğrudan verilebilir.
   */
  dunyaViewMatrisi(tr) {
    const a = this.dunyadanViewe([1, 0, 0], tr);
    const b = this.dunyadanViewe([0, 1, 0], tr);
    const c = this.dunyadanViewe([0, 0, 1], tr);
    return new Float32Array([a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]]);
  },

  /** Dönme matrisi ortonormaldir → tersi devriğidir (view → dünya-sabit) */
  viewDunyaMatrisi(tr) {
    const m = this.dunyaViewMatrisi(tr);
    return new Float32Array([m[0], m[3], m[6], m[1], m[4], m[7], m[2], m[5], m[8]]);
  },

  /**
   * Kürenin VIEW uzayındaki merkezi ve piksel yarıçapı.
   * İkisi de MapLibre'nin atmosfer çiziminden birebir alınmıştır
   * (draw_sky.ts · drawAtmosphere): MapLibre'nin view uzayı PİKSEL birimlidir,
   * bu yüzden ışın-küre kesişimi doğrudan bu uzayda yapılabilir.
   */
  kureKaresi(tr) {
    const yaricap = tr.worldSize / (2 * Math.PI) / Math.cos(tr.center.lat * this.DER);

    // Küre merkezini (küre uzayının orijini) view uzayına taşı: MVP ile clip'e,
    // oradan ters projeksiyonla view'e. MapLibre de tam olarak bunu yapıyor.
    const v = [0, 0, 0, 1];
    this._mat4vec4(v, tr.modelViewProjectionMatrix);
    v[0] /= v[3]; v[1] /= v[3]; v[2] /= v[3]; v[3] = 1;
    this._mat4vec4(v, tr.inverseProjectionMatrix);
    v[0] /= v[3]; v[1] /= v[3]; v[2] /= v[3];

    return { yaricap, merkez: [v[0], v[1], v[2]] };
  },

  /** v ← M·v  (sütun sıralı mat4, yerinde) */
  _mat4vec4(v, m) {
    const [x, y, z, w] = v;
    v[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    v[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    v[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    v[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
  },

  /** Azimut normalleştirmesi (isikKonumu için). Boylam sarması Solar._norm180'de. */
  _sar360(d) { return ((d % 360) + 360) % 360; },

  /**
   * Yıldız kataloğunu çözer → [ra(rad), dec(rad), kadir, ci] dörtlülerinden
   * tek bir interleaved Float32Array.
   *
   * ra/dec GÖKSEL çerçevede bırakılır; Dünya-sabite çevirim (λ = ra − GMST)
   * vertex shader'da `u_gmst` uniform'u ile yapılır. Böylece zaman değiştiğinde
   * 5070 yıldızın yönünü yeniden hesaplayıp tamponu tekrar yüklemek gerekmez —
   * tek bir uniform yazmak yeter.
   */
  yildizlariCoz(dizge) {
    const KAYIT = 12;
    const adet = Math.floor(dizge.length / KAYIT);
    const veri = new Float32Array(adet * 4);
    const SAAT = Math.PI / 12;                 // saat → radyan (24h = 2π)
    for (let i = 0; i < adet; i++) {
      const o = i * KAYIT;
      const ra = parseInt(dizge.substr(o, 4), 36) / 1000;              // saat
      const dec = parseInt(dizge.substr(o + 4, 4), 36) / 100 - 90;     // derece
      const mag = parseInt(dizge.substr(o + 8, 2), 36) / 10 - 2;
      const ci = parseInt(dizge.substr(o + 10, 2), 36) / 50 - 0.5;
      veri[i * 4] = ra * SAAT;
      veri[i * 4 + 1] = dec * this.DER;
      veri[i * 4 + 2] = mag;
      veri[i * 4 + 3] = ci;
    }
    return { veri, adet };
  }
};

// =========================================================================
// WEBGL YARDIMCILARI
// =========================================================================

/** Tam ekran dörtgeni: NDC köşeleri. İki üçgen, 6 köşe (indeks tamponu yok). */
const TAM_EKRAN = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);

function _shaderKur(gl, tip, kaynak, ad) {
  const sh = gl.createShader(tip);
  gl.shaderSource(sh, kaynak);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh);
    gl.deleteShader(sh);
    throw new Error(`${ad} shader derlenemedi: ${log}`);
  }
  return sh;
}

/**
 * Program derler ve uniform/attribute konumlarını TOPLU çözer.
 *
 * Konumları her karede `getUniformLocation` ile sormak ölçülebilir bir maliyet
 * (her çağrı bir GL sorgusu); bir kere çözüp nesnede tutmak standart pratiktir.
 */
function programKur(gl, vs, fs, ad, uniformlar, attributelar) {
  const p = gl.createProgram();
  const v = _shaderKur(gl, gl.VERTEX_SHADER, vs, ad + ' vertex');
  const f = _shaderKur(gl, gl.FRAGMENT_SHADER, fs, ad + ' fragment');
  gl.attachShader(p, v);
  gl.attachShader(p, f);
  gl.linkProgram(p);
  gl.deleteShader(v);
  gl.deleteShader(f);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(p);
    gl.deleteProgram(p);
    throw new Error(`${ad} programı bağlanamadı: ${log}`);
  }
  const u = {};
  (uniformlar || []).forEach(n => { u[n] = gl.getUniformLocation(p, n); });
  const a = {};
  (attributelar || []).forEach(n => { a[n] = gl.getAttribLocation(p, n); });
  return { program: p, u, a };
}

/** Işın-küre kesişimi + gürültü: iki shader'ın paylaştığı GLSL parçası */
const GLSL_ORTAK = `
vec2 kureKesisim(vec3 rd, vec3 merkez, float yaricap) {
  vec3 oc = -merkez;
  float b = dot(oc, rd);
  float c = dot(oc, oc) - yaricap * yaricap;
  float disc = b * b - c;
  if (disc < 0.0) return vec2(1.0, -1.0);          // kesişim yok
  float k = sqrt(disc);
  return vec2(-b - k, -b + k);
}
bool kureGizler(vec3 rd, vec3 merkez, float yaricap) {
  vec2 t = kureKesisim(rd, merkez, yaricap);
  return t.x <= t.y && t.x > 0.0;
}
`;

// =========================================================================
// YILDIZ KATMANI — gerçek katalog + prosedürel Samanyolu
// =========================================================================
/**
 * MapLibre `CustomLayerInterface`. İki çizim yapar:
 *   1. Tam ekran dörtgeni → Samanyolu bandı ve derin uzay dokusu
 *   2. `gl.POINTS` → katalogdaki 5070 yıldız
 *
 * GEZEGENİN ARKASINDAKİ YILDIZLAR: derinlik tamponuna hiç güvenilmiyor.
 * MapLibre özel katmanları `DepthMode.ReadOnly` ile çiziyor ve raster katmanları
 * derinlik YAZMIYOR; dolayısıyla "gezegen yıldızı kapatsın" işini derinlik testi
 * yapamaz. Yerine analitik ışın-küre testi kullanılıyor: her yıldız için
 * kameradan o yöne giden ışın küreyi kesiyorsa yıldız clip hacminin dışına
 * atılıyor. Tam ekran geçişte de aynı test `discard` ile yapılıyor.
 *
 * KARIŞTIRMA: MapLibre özel katmanları `ColorMode.alphaBlended` ile çiziyor,
 * yani ÖNCEDEN ÇARPILMIŞ (premultiplied) alfa: out = src.rgb + dst·(1−src.a).
 * Yıldız ve Samanyolu için alfa 0 yazıyoruz → saf EKLEMELİ ışık. Fizikî olarak
 * da doğrusu bu: yıldız ışığı arkasındakini kapatmaz, üstüne eklenir.
 */
class YildizKatmani {
  /**
   * @param {() => {tarih: Date, yogunluk: number}} durumKaynagi
   *        Zaman ve parlaklık ayarını okuyan geri çağrı (tek doğruluk kaynağı
   *        GlobeView'da dursun diye katman durumu kendi tutmuyor).
   */
  constructor(durumKaynagi) {
    this.id = 'gok-yildiz';
    this.type = 'custom';
    this.renderingMode = '2d';
    this._durum = durumKaynagi;
    this._hazir = false;
  }

  onAdd(map, gl) {
    this.map = map;

    const vsTamEkran = `#version 300 es
in vec2 a_pos;
uniform mat4 u_inv_proj;
out vec3 v_ray;
void main() {
  v_ray = (u_inv_proj * vec4(a_pos, 0.0, 1.0)).xyz;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

    // --- Samanyolu: galaktik enleme bağlı bant + iki oktavlı toz dokusu
    const fsSamanyolu = `#version 300 es
precision highp float;
in vec3 v_ray;
uniform vec3 u_kure_merkez;
uniform float u_kure_yaricap;
uniform mat3 u_view_dunya;
uniform vec3 u_galaktik_kutup;
uniform float u_gecis;
uniform float u_yogunluk;
out vec4 fragColor;
${GLSL_ORTAK}
float hash(vec3 p) { return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453); }
float gurultu(vec3 p) {
  vec3 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);                   // yumuşak geçiş (smoothstep)
  float n000 = hash(i);
  float n100 = hash(i + vec3(1.0, 0.0, 0.0));
  float n010 = hash(i + vec3(0.0, 1.0, 0.0));
  float n110 = hash(i + vec3(1.0, 1.0, 0.0));
  float n001 = hash(i + vec3(0.0, 0.0, 1.0));
  float n101 = hash(i + vec3(1.0, 0.0, 1.0));
  float n011 = hash(i + vec3(0.0, 1.0, 1.0));
  float n111 = hash(i + vec3(1.0, 1.0, 1.0));
  return mix(mix(mix(n000, n100, f.x), mix(n010, n110, f.x), f.y),
             mix(mix(n001, n101, f.x), mix(n011, n111, f.x), f.y), f.z);
}
float fbm(vec3 p) {
  float s = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { s += a * gurultu(p); p *= 2.17; a *= 0.5; }
  return s;
}
void main() {
  vec3 rd = normalize(v_ray);
  if (kureGizler(rd, u_kure_merkez, u_kure_yaricap)) discard;

  vec3 d = normalize(u_view_dunya * rd);
  float sinb = clamp(dot(d, u_galaktik_kutup), -1.0, 1.0);   // galaktik enlem sinüsü
  float bant = exp(-(sinb * sinb) / 0.012);

  float bulut = fbm(d * 9.0);
  float toz = fbm(d * 23.0 + 11.0);
  float sy = bant * (0.32 + 0.68 * bulut) * (0.5 + 0.5 * toz);

  vec3 renk = mix(vec3(0.60, 0.65, 0.84), vec3(0.88, 0.82, 0.70), bulut) * sy * 0.21;
  renk *= 1.0 - 0.6 * bant * smoothstep(0.45, 0.9, toz);     // karanlık toz şeritleri

  // Derin uzay hiçbir zaman tam siyah değildir: çok sönük bir taban parıltı,
  // gökyüzünün "boya kovası" gibi düz durmasını engelliyor.
  renk += vec3(0.020, 0.024, 0.038) * (0.45 + 0.55 * fbm(d * 3.1));

  fragColor = vec4(renk * u_gecis * u_yogunluk, 0.0);        // EKLEMELİ
}`;

    // --- Yıldızlar: ra/dec göksel çerçevede, GMST döndürmesi shader'da
    const vsYildiz = `#version 300 es
in vec2 a_radec;
in vec2 a_ozellik;
uniform mat4 u_proj;
uniform mat3 u_dunya_view;
uniform vec3 u_kure_merkez;
uniform float u_kure_yaricap;
uniform float u_gmst;
uniform float u_uzaklik;
uniform float u_piksel;
out vec3 v_renk;
out float v_alfa;

vec3 ciRenk(float ci) {
  float t = clamp((ci + 0.35) / 2.25, 0.0, 1.0);
  vec3 mavi = vec3(0.70, 0.79, 1.00);
  vec3 beyaz = vec3(1.00, 0.99, 0.96);
  vec3 sari = vec3(1.00, 0.93, 0.74);
  vec3 kizil = vec3(1.00, 0.72, 0.50);
  if (t < 0.33) return mix(mavi, beyaz, t / 0.33);
  if (t < 0.66) return mix(beyaz, sari, (t - 0.33) / 0.33);
  return mix(sari, kizil, (t - 0.66) / 0.34);
}

void main() {
  // GÖKSEL → DÜNYA-SABİT: yıldız, boylamı (ra − GMST) olan noktanın tepesindedir
  float lng = a_radec.x - u_gmst;
  float lat = a_radec.y;
  float cl = cos(lat);
  vec3 dunya = vec3(sin(lng) * cl, sin(lat), cos(lng) * cl);

  vec3 yv = normalize(u_dunya_view * dunya);

  // Gezegenin arkasında kalan yıldızı clip hacminin dışına at
  vec3 oc = -u_kure_merkez;
  float b = dot(oc, yv);
  float c = dot(oc, oc) - u_kure_yaricap * u_kure_yaricap;
  float disc = b * b - c;
  if (disc >= 0.0 && (-b - sqrt(disc)) > 0.0) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    gl_PointSize = 0.0;
    v_renk = vec3(0.0);
    v_alfa = 0.0;
    return;
  }

  // Yön ışını üzerinde herhangi bir pozitif uzaklık aynı ekran konumunu verir
  // (perspektif bölmesi uzaklığı sadeleştirir); NDC z = 0 yazıp derinlik
  // tartışmasını tamamen dışarıda bırakıyoruz — sıralamayı katman sırası kurar.
  vec4 clip = u_proj * vec4(yv * u_uzaklik, 1.0);
  gl_Position = vec4(clip.xy, 0.0, clip.w);

  // Kadir → ekran boyutu/parlaklığı. Gerçek akı 10^(−0.4·mag) ile gider ve
  // Sirius ile kadir 6 arasında ~950 kat fark var; bu oran ekranda birebir
  // kullanılamaz (sönükler görünmez olur, parlaklar beyaz lekeye döner).
  // Bu yüzden sıkıştırılmış bir eğri: sıralama korunur, dinamik aralık ekrana
  // sığar — Sirius açık ara en parlak kalır, kadir 6 zar zor seçilir.
  float p = clamp((6.0 - a_ozellik.x) / 7.5, 0.0, 1.0);      // 0 sönük … 1 Sirius
  gl_PointSize = (1.3 + 3.9 * pow(p, 1.55)) * u_piksel;
  v_alfa = 0.30 + 0.70 * pow(p, 0.75);
  v_renk = ciRenk(a_ozellik.y);
}`;

    const fsYildiz = `#version 300 es
precision highp float;
in vec3 v_renk;
in float v_alfa;
uniform float u_gecis;
uniform float u_yogunluk;
out vec4 fragColor;
void main() {
  float r = length(gl_PointCoord - 0.5) * 2.0;
  if (r > 1.0) discard;
  // Çekirdek + hale: tek piksellik sert nokta "ölü" durur, hale canlandırır
  float i = (exp(-r * r * 5.5) + exp(-r * 2.0) * 0.28) * v_alfa * 1.4;
  fragColor = vec4(v_renk * i * u_gecis * u_yogunluk, 0.0);   // EKLEMELİ
}`;

    this._sy = programKur(gl, vsTamEkran, fsSamanyolu, 'Samanyolu',
      ['u_inv_proj', 'u_kure_merkez', 'u_kure_yaricap', 'u_view_dunya', 'u_galaktik_kutup', 'u_gecis', 'u_yogunluk'],
      ['a_pos']);

    this._yd = programKur(gl, vsYildiz, fsYildiz, 'Yıldız',
      ['u_proj', 'u_dunya_view', 'u_kure_merkez', 'u_kure_yaricap', 'u_gmst', 'u_uzaklik', 'u_piksel', 'u_gecis', 'u_yogunluk'],
      ['a_radec', 'a_ozellik']);

    this._quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this._quad);
    gl.bufferData(gl.ARRAY_BUFFER, TAM_EKRAN, gl.STATIC_DRAW);

    const katalog = (typeof YILDIZ_KATALOGU === 'string') ? YILDIZ_KATALOGU : '';
    const { veri, adet } = GokMekanigi.yildizlariCoz(katalog);
    this._adet = adet;
    this._yildizTampon = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this._yildizTampon);
    gl.bufferData(gl.ARRAY_BUFFER, veri, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    this._hazir = adet > 0;
    if (!this._hazir) console.warn('Yıldız kataloğu boş — data/yildiz_katalogu.js yüklendi mi?');
  }

  onRemove(map, gl) {
    [this._quad, this._yildizTampon].forEach(b => { if (b) gl.deleteBuffer(b); });
    [this._sy, this._yd].forEach(p => { if (p) gl.deleteProgram(p.program); });
    this._sy = this._yd = this._quad = this._yildizTampon = null;
    this._hazir = false;
  }

  render(gl, args) {
    if (!this._hazir) return;
    const tr = this.map && this.map.transform;
    if (!tr || !tr.inverseProjectionMatrix) return;

    const gecis = (args.defaultProjectionData && args.defaultProjectionData.projectionTransition);
    const g = (gecis === undefined || gecis === null) ? 1 : gecis;
    if (g <= 0.001) return;                       // Mercator'a geçildi: uzay yok

    const durum = this._durum();
    if (durum.yogunluk <= 0.001) return;

    const kure = GokMekanigi.kureKaresi(tr);
    const gunes = GokMekanigi.altGunesNoktasi(durum.tarih);
    const invProj = new Float32Array(tr.inverseProjectionMatrix);

    // --- 1) Samanyolu
    // Galaktik kuzey kutbu: ra 12h51.4m (192.8595°), dec +27.1284° (J2000).
    // Göksel çerçeveden Dünya-sabite GMST ile taşınır — yıldızlarla aynı kural.
    const kutup = GokMekanigi.yuzeyVektoru(192.8595 - gunes.gmst, 27.1284);

    gl.useProgram(this._sy.program);
    gl.uniformMatrix4fv(this._sy.u.u_inv_proj, false, invProj);
    gl.uniform3fv(this._sy.u.u_kure_merkez, kure.merkez);
    gl.uniform1f(this._sy.u.u_kure_yaricap, kure.yaricap);
    gl.uniformMatrix3fv(this._sy.u.u_view_dunya, false, GokMekanigi.viewDunyaMatrisi(tr));
    gl.uniform3fv(this._sy.u.u_galaktik_kutup, kutup);
    gl.uniform1f(this._sy.u.u_gecis, g);
    gl.uniform1f(this._sy.u.u_yogunluk, durum.yogunluk);

    gl.bindBuffer(gl.ARRAY_BUFFER, this._quad);
    gl.enableVertexAttribArray(this._sy.a.a_pos);
    gl.vertexAttribPointer(this._sy.a.a_pos, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    // --- 2) Yıldızlar
    gl.useProgram(this._yd.program);
    gl.uniformMatrix4fv(this._yd.u.u_proj, false, new Float32Array(tr.projectionMatrix));
    gl.uniformMatrix3fv(this._yd.u.u_dunya_view, false, GokMekanigi.dunyaViewMatrisi(tr));
    gl.uniform3fv(this._yd.u.u_kure_merkez, kure.merkez);
    gl.uniform1f(this._yd.u.u_kure_yaricap, kure.yaricap);
    gl.uniform1f(this._yd.u.u_gmst, gunes.gmst * GokMekanigi.DER);
    gl.uniform1f(this._yd.u.u_uzaklik, Math.max(1, args.farZ * 0.5));
    gl.uniform1f(this._yd.u.u_piksel, (this.map.getPixelRatio && this.map.getPixelRatio()) || window.devicePixelRatio || 1);
    gl.uniform1f(this._yd.u.u_gecis, g);
    gl.uniform1f(this._yd.u.u_yogunluk, durum.yogunluk);

    gl.bindBuffer(gl.ARRAY_BUFFER, this._yildizTampon);
    gl.enableVertexAttribArray(this._yd.a.a_radec);
    gl.vertexAttribPointer(this._yd.a.a_radec, 2, gl.FLOAT, false, 16, 0);
    gl.enableVertexAttribArray(this._yd.a.a_ozellik);
    gl.vertexAttribPointer(this._yd.a.a_ozellik, 2, gl.FLOAT, false, 16, 8);
    gl.drawArrays(gl.POINTS, 0, this._adet);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }
}

// =========================================================================
// GECE KATMANI — terminatör, alacakaranlık, şehir ışıkları
// =========================================================================
/**
 * Her piksel için kameradan çıkan ışını küreyle kesiştirir, yüzey normalini
 * bulur ve `dot(N, güneşYönü)` ile O NOKTADAKİ GÜNEŞ YÜKSELTİSİNİN SİNÜSÜNÜ
 * hesaplar. Gerisi bu tek sayıdan türer:
 *
 *   h > 0        gündüz — örtü tamamen şeffaf, uydu görüntüsü el değmemiş kalır
 *   0 … −6°      sivil alacakaranlık
 *   −6 … −12°    denizci alacakaranlığı
 *   −12 … −18°   astronomik alacakaranlık
 *   h < −18°     gerçek gece
 *
 * NEDEN BU KATMAN ŞEKİLLERİN ALTINDA: gece örtüsü, üstüne binerse sınav
 * şekillerini ve pinlerini de karartır. Katman sırası `sekil-alan`'ın ALTINA
 * kuruluyor (bkz. GlobeView._gokKatmanlariniKur) — böylece gece tarafındaki
 * sorular okunaklı kalıyor.
 */
class GeceKatmani {
  /**
   * @param {() => {tarih: Date, karanlik: number, isiklar: boolean}} durumKaynagi
   */
  constructor(durumKaynagi) {
    this.id = 'gok-gece';
    this.type = 'custom';
    this.renderingMode = '2d';
    this._durum = durumKaynagi;
    this._isikDoku = null;
    this._isikYuklendi = false;
  }

  onAdd(map, gl) {
    this.map = map;

    const vs = `#version 300 es
in vec2 a_pos;
uniform mat4 u_inv_proj;
out vec3 v_ray;
void main() {
  v_ray = (u_inv_proj * vec4(a_pos, 0.0, 1.0)).xyz;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

    const fs = `#version 300 es
precision highp float;
in vec3 v_ray;
uniform vec3 u_kure_merkez;
uniform float u_kure_yaricap;
uniform vec3 u_gunes;
uniform mat3 u_view_dunya;
uniform float u_gecis;
uniform float u_karanlik;
uniform sampler2D u_isiklar;
uniform float u_isik_var;
out vec4 fragColor;
const float PI = 3.141592653589793;
${GLSL_ORTAK}
void main() {
  vec3 rd = normalize(v_ray);
  vec2 t = kureKesisim(rd, u_kure_merkez, u_kure_yaricap);
  if (t.x > t.y || t.x <= 0.0) discard;          // gezegene değmeyen piksel: uzay

  vec3 P = rd * t.x;
  vec3 N = normalize(P - u_kure_merkez);
  float h = dot(N, u_gunes);                     // = sin(güneş yükseltisi)

  // KARARTMA EĞRİSİ. Aydınlanma güneş yükseltisiyle DOĞRUSAL gitmez: öğle
  // vakti ~100.000 lux, sivil alacakaranlığın sonunda (−6°) ~3 lux, denizci
  // alacakaranlığında (−12°) ~0.008 lux — yani ufkun hemen altında dört kat
  // büyüklük düşüyor. Karartmayı −18°'ye kadar doğrusal yaymak bu yüzden
  // yanlış görünüyordu: Grönland karı −9°'de hâlâ "gündüz" gibi okunuyordu.
  // Karartma artık ufkun hemen altında doyuyor (−6° … +1°, yaklaşık 780 km
  // genişliğinde bir kuşak — Dünya'nın gerçek alacakaranlık şeridi kadar).
  // −18°'ye uzanan kısım yalnızca alacakaranlık RENGİNİ taşır (aşağıdaki halka).
  float gece = 1.0 - smoothstep(-0.105, 0.017, h);
  float alfa = u_karanlik * gece;
  vec3 geceRengi = vec3(0.012, 0.026, 0.062);

  // Gün batımı/doğumu halkası: terminatörün iki yanında sıcak saçılma.
  // Işığın kızarması atmosferde uzun yol kat etmesindendir; kuşak bu yüzden
  // h = 0 çevresinde dar ve gece tarafına doğru hafifçe kırmızıya kayar.
  float kusak = exp(-(h * h) / 0.0090);
  vec3 halka = mix(vec3(1.00, 0.38, 0.10), vec3(1.00, 0.70, 0.38),
                   smoothstep(-0.09, 0.09, h)) * kusak * 0.22;

  // Şehir ışıkları: yüzey noktasının coğrafi konumundan equirect doku örneği
  vec3 g = normalize(u_view_dunya * N);
  float lat = asin(clamp(g.y, -1.0, 1.0));
  float lng = atan(g.x, g.z);
  vec2 uv = vec2(lng / (2.0 * PI) + 0.5, 0.5 - lat / PI);
  // Isiklar gunduz gorunmez, gece tam gucte. smoothstep'in ILK esigi IKINCIDEN
  // KUCUK olmak zorundadir (aksi halde GLSL'de tanimsiz davranis), bu yuzden
  // sirali esik + tersleme kullaniliyor.
  vec3 sehir = texture(u_isiklar, uv).rgb * u_isik_var
             * (1.0 - smoothstep(-0.20, -0.02, h)) * 1.5;

  vec3 rgb = geceRengi * alfa + halka + sehir;
  fragColor = vec4(rgb, alfa) * u_gecis;            // ÖNCEDEN ÇARPILMIŞ alfa
}`;

    this._p = programKur(gl, vs, fs, 'Gece',
      ['u_inv_proj', 'u_kure_merkez', 'u_kure_yaricap', 'u_gunes', 'u_view_dunya',
        'u_gecis', 'u_karanlik', 'u_isiklar', 'u_isik_var'],
      ['a_pos']);

    this._quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this._quad);
    gl.bufferData(gl.ARRAY_BUFFER, TAM_EKRAN, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    // Şehir ışıkları gelene kadar örneklenecek 1×1 siyah doku: shader'ın
    // bağlanmamış örnekleyiciyle çalışması tanımsız davranıştır.
    this._isikDoku = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this._isikDoku);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, null);

    this._isiklariYukle(gl);
  }

  /**
   * NASA GIBS'ten tek karelik VIIRS Black Marble (gece ışıkları) mozaiği.
   *
   * NEDEN TEK GÖRÜNTÜ, DÖŞEME DEĞİL: MapLibre raster kaynağı olarak eklenseydi
   * ışıklar GÜNDÜZ TARAFINDA da görünürdü — rasteri terminatörle maskelemenin
   * stil tarafında bir yolu yok. Doku olarak shader'a verilince maskeleme
   * zaten hesapladığımız güneş yükseltisiyle bedavaya geliyor.
   *
   * Başarısız olursa (çevrimdışı, GIBS kapalı) `u_isik_var = 0` kalır ve
   * terminatör ışıklar olmadan çalışmaya devam eder.
   */
  _isiklariYukle(gl) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        gl.bindTexture(gl.TEXTURE_2D, this._isikDoku);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        // Boylamda sarmalı (tarih çizgisi), enlemde kenara kilitle (kutuplar)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.bindTexture(gl.TEXTURE_2D, null);
        this._isikYuklendi = true;
        if (this.map) this.map.triggerRepaint();
      } catch (e) {
        console.warn('Gece ışıkları dokusu yüklenemedi:', e && e.message);
      }
    };
    img.onerror = () => console.warn('Gece ışıkları indirilemedi (NASA GIBS erişilemiyor) — terminatör ışıksız çalışacak.');
    img.src = 'https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi'
      + '?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&LAYERS=VIIRS_Black_Marble'
      + '&SRS=EPSG:4326&BBOX=-180,-90,180,90&WIDTH=2048&HEIGHT=1024'
      + '&FORMAT=image/jpeg&TIME=2016-01-01';
  }

  onRemove(map, gl) {
    if (this._quad) gl.deleteBuffer(this._quad);
    if (this._isikDoku) gl.deleteTexture(this._isikDoku);
    if (this._p) gl.deleteProgram(this._p.program);
    this._quad = this._isikDoku = this._p = null;
    this._isikYuklendi = false;
  }

  render(gl, args) {
    const tr = this.map && this.map.transform;
    if (!this._p || !tr || !tr.inverseProjectionMatrix) return;

    const gecis = (args.defaultProjectionData && args.defaultProjectionData.projectionTransition);
    const g = (gecis === undefined || gecis === null) ? 1 : gecis;
    if (g <= 0.001) return;

    const durum = this._durum();
    if (durum.karanlik <= 0.001) return;          // "gündüz kilidi" açık

    const kure = GokMekanigi.kureKaresi(tr);
    const gunes = GokMekanigi.altGunesNoktasi(durum.tarih);
    const gunesView = GokMekanigi.dunyadanViewe(
      GokMekanigi.yuzeyVektoru(gunes.lng, gunes.lat), tr);

    gl.useProgram(this._p.program);
    gl.uniformMatrix4fv(this._p.u.u_inv_proj, false, new Float32Array(tr.inverseProjectionMatrix));
    gl.uniform3fv(this._p.u.u_kure_merkez, kure.merkez);
    gl.uniform1f(this._p.u.u_kure_yaricap, kure.yaricap);
    gl.uniform3fv(this._p.u.u_gunes, gunesView);
    gl.uniformMatrix3fv(this._p.u.u_view_dunya, false, GokMekanigi.viewDunyaMatrisi(tr));
    gl.uniform1f(this._p.u.u_gecis, g);
    gl.uniform1f(this._p.u.u_karanlik, durum.karanlik);
    gl.uniform1f(this._p.u.u_isik_var, (this._isikYuklendi && durum.isiklar) ? 1 : 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this._isikDoku);
    gl.uniform1i(this._p.u.u_isiklar, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this._quad);
    gl.enableVertexAttribArray(this._p.a.a_pos);
    gl.vertexAttribPointer(this._p.a.a_pos, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }
}

// Node ortamında (tools/solar_test.js) GokMekanigi'nin saf matematiğini
// doğrulayabilmek için dışa verilir. Tarayıcıda bu satır çalışmaz.
if (typeof module !== 'undefined' && module.exports) module.exports = { GokMekanigi };
