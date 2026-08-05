import * as THREE from 'three';

export function buildMachine() {
  const M = {
    inox:      new THREE.MeshStandardMaterial({ color: 0xc2c7cc, metalness: 0.38, roughness: 0.32 }),
    acero:     new THREE.MeshStandardMaterial({ color: 0x585e66, metalness: 0.35, roughness: 0.45 }),
    gabinete:  new THREE.MeshStandardMaterial({ color: 0xdcdcd6, metalness: 0.15, roughness: 0.55 }),
    policarb:  new THREE.MeshStandardMaterial({ color: 0xa9c6cc, metalness: 0.0, roughness: 0.08, transparent: true, opacity: 0.16, side: THREE.DoubleSide }),
    ventosa:   new THREE.MeshStandardMaterial({ color: 0xa8552a, metalness: 0.0, roughness: 0.8 }),
    banda:     new THREE.MeshStandardMaterial({ color: 0xe8e9e4, metalness: 0.0, roughness: 0.75 }),
    goma:      new THREE.MeshStandardMaterial({ color: 0x2a2c30, metalness: 0.0, roughness: 0.9 }),
    carton:    new THREE.MeshStandardMaterial({ color: 0xb98a55, metalness: 0.0, roughness: 0.95 }),
    naranja:   new THREE.MeshStandardMaterial({ color: 0xf08c14, metalness: 0.0, roughness: 0.62 }),
    neumatica: new THREE.MeshStandardMaterial({ color: 0x2464c4, metalness: 0.1, roughness: 0.5 }),
    senal:     new THREE.MeshStandardMaterial({ color: 0xe8621a, metalness: 0.1, roughness: 0.5 }),
  };
  for (const k in M) M[k].name = k;

  const g = new THREE.Group();
  g.name = 'empacadora_telescopica';

  const add = (name, geo, mat, x, y, z, rot) => {
    const m = new THREE.Mesh(geo, mat);
    m.name = name; m.position.set(x, y, z);
    if (rot) m.rotation.set(rot[0] || 0, rot[1] || 0, rot[2] || 0);
    m.castShadow = true; m.receiveShadow = true;
    g.add(m);
    return m;
  };
  const box = (name, mat, w, h, d, x, y, z, rot) => add(name, new THREE.BoxGeometry(w, h, d), mat, x, y, z, rot);
  const cyl = (name, mat, r1, r2, h, x, y, z, rot, seg) => add(name, new THREE.CylinderGeometry(r1, r2, h, seg || 24), mat, x, y, z, rot);

  const HX = 2.0, HZ = 1.1, TOP = 2.90, C = 0.09; // half-length, half-depth, frame height, tube

  /* ---------- bastidor / frame ---------- */
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    box('columna', M.inox, C, TOP, C, sx * (HX - C / 2), TOP / 2 + 0.06, sz * (HZ - C / 2));
    cyl('pata_niveladora', M.acero, 0.05, 0.07, 0.06, sx * (HX - C / 2), 0.03, sz * (HZ - C / 2), null, 16);
  }
  for (const sz of [-1, 1]) {
    box('columna_central', M.inox, C, TOP, C, 0, TOP / 2 + 0.06, sz * (HZ - C / 2));
    box('travesano_inferior', M.inox, HX * 2, 0.10, C, 0, 0.11, sz * (HZ - C / 2));
    box('travesano_superior', M.inox, HX * 2, 0.12, C, 0, TOP + 0.02, sz * (HZ - C / 2));
    box('travesano_medio', M.inox, HX * 2, 0.08, 0.07, 0, 2.05, sz * (HZ - C / 2));
  }
  for (const sx of [-1, 1]) {
    box('travesano_lateral_sup', M.inox, C, 0.12, HZ * 2, sx * (HX - C / 2), TOP + 0.02, 0);
    box('travesano_lateral_inf', M.inox, C, 0.10, HZ * 2, sx * (HX - C / 2), 0.11, 0);
  }

  /* ---------- carenado / enclosure ---------- */
  for (const sz of [-1, 1]) for (const sx of [-1, 1]) {
    const cxp = sx * 0.98;
    box('panel_policarbonato', M.policarb, 1.85, 1.72, 0.012, cxp, 1.98, sz * HZ);
    for (const e of [-0.925, 0.925]) box('marco_puerta_v', M.inox, 0.05, 1.78, 0.05, cxp + e, 1.98, sz * HZ);
    for (const e of [-0.89, 0.89]) box('marco_puerta_h', M.inox, 1.90, 0.05, 0.05, cxp, 1.98 + e, sz * HZ);
    box('tirador_puerta', M.acero, 0.035, 0.40, 0.035, sx * 0.16, 1.98, sz * (HZ + 0.07));
  }
  for (const sz of [-1, 1]) box('zocalo', M.inox, HX * 2, 0.55, 0.015, 0, 0.42, sz * (HZ - 0.01));
  for (const sx of [-1, 1]) box('panel_lateral', M.policarb, 0.012, 1.72, 2.05, sx * HX, 1.98, 0);

  /* ---------- pórtico y carro / gantry ---------- */
  for (const sz of [-1, 1]) box('riel_portico', M.acero, 3.55, 0.13, 0.13, 0, 2.72, sz * 0.55);
  box('carro_portico', M.acero, 1.35, 0.26, 1.35, 0.25, 2.55, 0);
  box('servomotor', M.gabinete, 0.26, 0.26, 0.34, 0.95, 2.60, 0.42);
  cyl('husillo', M.inox, 0.035, 0.035, 1.9, -1.55, 2.72, 0, [0, 0, Math.PI / 2], 16);

  /* ---------- cabezal telescópico / picking head ---------- */
  const HEAD_Y = 1.86;
  for (const dx of [-0.5, 0, 0.5]) for (const dz of [-0.5, 0.5]) {
    cyl('guia_telescopica', M.inox, 0.032, 0.032, 0.72, 0.25 + dx, HEAD_Y + 0.40, dz, null, 16);
  }
  box('placa_cabezal', M.acero, 1.30, 0.08, 1.30, 0.25, HEAD_Y, 0);
  box('colector_aire', M.inox, 1.10, 0.09, 0.09, 0.25, HEAD_Y + 0.12, 0.5);
  for (let i = 0; i < 6; i++) for (let j = 0; j < 5; j++) {
    const x = 0.25 - 0.5 + i * 0.2, z = -0.44 + j * 0.22;
    cyl('vastago_ventosa', M.inox, 0.022, 0.022, 0.22, x, HEAD_Y - 0.15, z, null, 12);
    cyl('ventosa', M.ventosa, 0.045, 0.085, 0.13, x, HEAD_Y - 0.32, z, null, 20);
    add('fuelle_ventosa', new THREE.TorusGeometry(0.052, 0.016, 8, 18), M.ventosa, x, HEAD_Y - 0.22, z, [Math.PI / 2, 0, 0]);
  }

  /* ---------- cinta de alimentación / infeed ---------- */
  const IN_Y = 1.36;
  box('banda_alimentacion', M.banda, 3.0, 0.05, 1.15, 1.1, IN_Y, 0);
  for (const sz of [-1, 1]) box('guia_banda', M.inox, 3.0, 0.13, 0.05, 1.1, IN_Y + 0.08, sz * 0.60);
  for (const sx of [2.15, 2.45]) box('pata_alimentacion', M.inox, 0.07, IN_Y, 0.07, sx, IN_Y / 2, 0.55);
  cyl('rodillo_motriz', M.acero, 0.09, 0.09, 1.15, 2.55, IN_Y, 0, [Math.PI / 2, 0, 0], 20);
  cyl('motorreductor', M.gabinete, 0.13, 0.13, 0.30, 2.55, IN_Y, 0.78, [Math.PI / 2, 0, 0], 20);

  // fruta sobre la banda y bajo el cabezal
  const fruit = (x, z, y) => {
    const m = add('fruta', new THREE.SphereGeometry(0.058, 20, 14), M.naranja, x, y, z);
    m.scale.set(1, 0.92, 1);
  };
  for (let i = 0; i < 6; i++) for (let j = 0; j < 5; j++) fruit(0.25 - 0.5 + i * 0.2, -0.44 + j * 0.22, IN_Y + 0.08);
  for (let i = 0; i < 7; i++) for (let j = 0; j < 5; j++) fruit(1.35 + i * 0.2, -0.44 + j * 0.22, IN_Y + 0.08);

  /* ---------- transportador de cajas / box conveyor ---------- */
  const CV_Y = 0.62;
  for (const sz of [-1, 1]) box('bastidor_transportador', M.inox, 6.6, 0.14, 0.06, 0, CV_Y, sz * 0.52);
  for (let x = -3.2; x <= 3.2; x += 0.17) cyl('rodillo', M.inox, 0.045, 0.045, 0.98, x, CV_Y + 0.05, 0, [Math.PI / 2, 0, 0], 16);
  for (const sx of [-3.0, -2.3, 2.3, 3.0]) for (const sz of [-1, 1])
    box('pata_transportador', M.inox, 0.06, CV_Y - 0.07, 0.06, sx, (CV_Y - 0.07) / 2, sz * 0.52);

  const carton = (x, open) => {
    const w = 0.58, h = 0.34, d = 0.40, t = 0.012, y = CV_Y + 0.09;
    box('caja_fondo', M.carton, w, t, d, x, y - h / 2, 0);
    for (const sz of [-1, 1]) box('caja_pared', M.carton, w, h, t, x, y, sz * d / 2);
    for (const sx of [-1, 1]) box('caja_pared', M.carton, t, h, d, x + sx * w / 2, y, 0);
    if (open) for (const sz of [-1, 1]) box('caja_solapa', M.carton, w, 0.16, t, x, y + h / 2 + 0.07, sz * (d / 2 + 0.03), [sz * 0.35, 0, 0]);
    else for (let i = 0; i < 5; i++) for (let j = 0; j < 3; j++)
      fruit(x - 0.2 + i * 0.1, -0.11 + j * 0.11, y + h / 2 - 0.03);
  };
  carton(0.25, true);
  carton(-1.35, false);
  carton(-2.6, false);
  carton(2.1, true);

  /* ---------- gabinete eléctrico / control cabinet ---------- */
  box('gabinete_electrico', M.gabinete, 1.60, 0.95, 0.72, -0.85, 3.52, 0);
  box('puerta_gabinete', M.gabinete, 1.44, 0.80, 0.02, -0.85, 3.52, 0.37);
  box('placa_marca', M.senal, 0.52, 0.13, 0.015, -0.85, 3.80, 0.39);
  cyl('mastil_baliza', M.inox, 0.025, 0.025, 0.30, -0.20, 4.15, 0, null, 12);
  cyl('baliza_ambar', M.senal, 0.06, 0.06, 0.14, -0.20, 4.37, 0, null, 18);
  cyl('baliza_base', M.acero, 0.065, 0.065, 0.06, -0.20, 4.47, 0, null, 18);
  box('soporte_gabinete', M.inox, 1.4, 0.10, 0.55, -0.85, 3.02, 0);

  /* ---------- HMI ---------- */
  box('brazo_hmi', M.inox, 0.06, 0.06, 0.55, 1.55, 2.10, HZ + 0.28);
  box('pantalla_hmi', M.acero, 0.44, 0.34, 0.07, 1.55, 1.92, HZ + 0.52, [0.25, 0, 0]);
  box('visor_hmi', M.gabinete, 0.34, 0.24, 0.01, 1.55, 1.93, HZ + 0.556, [0.25, 0, 0]);

  /* ---------- neumática / pneumatics ---------- */
  for (const sz of [-1, 1]) {
    cyl('tubo_neumatico', M.neumatica, 0.016, 0.016, 2.5, 1.90, 1.7, sz * 0.98, null, 10);
    cyl('tubo_neumatico', M.neumatica, 0.016, 0.016, 3.3, 0.25, 2.35, sz * 0.62, [0, 0, Math.PI / 2], 10);
  }
  for (const sx of [-1.2, 0.4]) box('valvula_neumatica', M.inox, 0.30, 0.16, 0.12, sx, 2.20, HZ - 0.14);
  box('franja_seguridad', M.senal, 4.0, 0.05, 0.02, 0, 0.30, HZ + 0.01);

  return g;
}
