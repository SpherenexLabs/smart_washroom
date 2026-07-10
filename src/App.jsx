


  // import { useEffect, useMemo, useRef, useState } from "react";
  // import { Canvas, useFrame } from "@react-three/fiber";
  // import {
  //   ContactShadows,
  //   OrbitControls,
  //   RoundedBox,
  // } from "@react-three/drei";
  // import { onValue, ref, set } from "firebase/database";
  // import {
  //   Area,
  //   AreaChart,
  //   CartesianGrid,
  //   ResponsiveContainer,
  //   Tooltip,
  //   XAxis,
  //   YAxis,
  // } from "recharts";
  // import { db, WASHROOM_PATH } from "./firebase";
  // import "./App.css";

  // const DEFAULT_DATA = {
  //   Gas: 0,
  //   Hum: 0,
  //   PIR: 0,
  //   Relay: 0,
  //   Temp: 0,
  //   Ultra: 0,
  //   Water: 0,
  // };

  // const RELAY_NAMES = {
  //   0: "All OFF",
  //   1: "Fan ON",
  //   2: "Light ON",
  //   3: "Flush ON",
  //   4: "Spray ON",
  // };

  // function toNumber(value) {
  //   const n = Number(value);
  //   return Number.isFinite(n) ? n : 0;
  // }

  // function relayName(value) {
  //   return RELAY_NAMES[Number(value)] || "Unknown";
  // }

  // function getStatus(value, low, high) {
  //   if (value <= low) return "low";
  //   if (value >= high) return "high";
  //   return "normal";
  // }

  // function statusText(status) {
  //   if (status === "high") return "HIGH ALERT";
  //   if (status === "low") return "LOW ALERT";
  //   return "NORMAL";
  // }

  // function ValueCard({ title, value, unit, icon, status }) {
  //   return (
  //     <div className={`value-card ${status}`}>
  //       <div className="value-bg"></div>

  //       <div className="value-top">
  //         <div>
  //           <p>{title}</p>
  //           <h2>
  //             {value}
  //             <span>{unit}</span>
  //           </h2>
  //         </div>

  //         <div className="value-icon">{icon}</div>
  //       </div>

  //       <div className="value-status">{statusText(status)}</div>
  //     </div>
  //   );
  // }

  // function StatusCard({ title, value, active, icon }) {
  //   return (
  //     <div className={`status-card ${active ? "active" : ""}`}>
  //       <div className="status-icon">{icon}</div>

  //       <div>
  //         <h4>{title}</h4>
  //         <p>{value}</p>
  //       </div>

  //       <span></span>
  //     </div>
  //   );
  // }

  // function GraphCard({ title, data, dataKey, unit }) {
  //   return (
  //     <div className="glass-card graph-card">
  //       <div className="section-head">
  //         <div>
  //           <h3>{title}</h3>
  //           <p>Realtime Firebase graph</p>
  //         </div>
  //         <label>LIVE</label>
  //       </div>

  //       <div className="chart-box">
  //         <ResponsiveContainer width="100%" height={220}>
  //           <AreaChart data={data}>
  //             <defs>
  //               <linearGradient id={`${dataKey}Fill`} x1="0" y1="0" x2="0" y2="1">
  //                 <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.65} />
  //                 <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.04} />
  //               </linearGradient>
  //             </defs>

  //             <CartesianGrid strokeDasharray="4 4" stroke="#dbeafe" />
  //             <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 10 }} />
  //             <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
  //             <Tooltip
  //               contentStyle={{
  //                 background: "#ffffff",
  //                 border: "1px solid #cfe8ff",
  //                 borderRadius: "14px",
  //                 color: "#0f172a",
  //                 boxShadow: "0 12px 30px rgba(15,23,42,0.12)",
  //               }}
  //               formatter={(value) => [`${value} ${unit}`, title]}
  //             />
  //             <Area
  //               type="monotone"
  //               dataKey={dataKey}
  //               stroke="#0284c7"
  //               strokeWidth={3}
  //               fill={`url(#${dataKey}Fill)`}
  //               dot={false}
  //             />
  //           </AreaChart>
  //         </ResponsiveContainer>
  //       </div>
  //     </div>
  //   );
  // }

  // /* ======================== 3D REALISTIC WASHROOM ======================== */

  // const ROOM = {
  //   width: 8.4,
  //   depth: 6.2,
  //   height: 3.55,
  //   backZ: -3.05,
  //   leftX: -4.2,
  //   rightX: 4.2,
  // };

  // const TOILET_POSITION = [2.35, 0.03, -2.18];

  // function FloorTiles() {
  //   return (
  //     <group>
  //       <RoundedBox
  //         args={[ROOM.width, 0.12, ROOM.depth]}
  //         radius={0.06}
  //         smoothness={5}
  //         position={[0, -0.06, 0]}
  //         receiveShadow
  //       >
  //         <meshStandardMaterial color="#f2f6f7" roughness={0.42} metalness={0.02} />
  //       </RoundedBox>

  //       {Array.from({ length: 15 }).map((_, i) => (
  //         <mesh key={`floor-line-x-${i}`} position={[-4.05 + i * 0.58, 0.014, 0]} receiveShadow>
  //           <boxGeometry args={[0.012, 0.012, 5.95]} />
  //           <meshStandardMaterial color="#cbd7dc" roughness={0.55} />
  //         </mesh>
  //       ))}

  //       {Array.from({ length: 11 }).map((_, i) => (
  //         <mesh key={`floor-line-z-${i}`} position={[0, 0.016, -2.85 + i * 0.58]} receiveShadow>
  //           <boxGeometry args={[8.1, 0.012, 0.012]} />
  //           <meshStandardMaterial color="#cbd7dc" roughness={0.55} />
  //         </mesh>
  //       ))}

  //       <RoundedBox args={[7.8, 0.035, 0.16]} radius={0.03} smoothness={4} position={[0, 0.035, -2.85]}>
  //         <meshStandardMaterial color="#d8e3e8" roughness={0.45} />
  //       </RoundedBox>
  //     </group>
  //   );
  // }

  // function BackWallTiles() {
  //   return (
  //     <group position={[0, ROOM.height / 2, ROOM.backZ]}>
  //       <RoundedBox args={[ROOM.width, ROOM.height, 0.14]} radius={0.06} smoothness={5} receiveShadow>
  //         <meshStandardMaterial color="#f9fbfb" roughness={0.38} />
  //       </RoundedBox>

  //       {Array.from({ length: 15 }).map((_, i) => (
  //         <mesh key={`back-tile-v-${i}`} position={[-4.0 + i * 0.57, 0, 0.076]}>
  //           <boxGeometry args={[0.012, 3.25, 0.014]} />
  //           <meshStandardMaterial color="#dce5ea" roughness={0.5} />
  //         </mesh>
  //       ))}

  //       {Array.from({ length: 8 }).map((_, i) => (
  //         <mesh key={`back-tile-h-${i}`} position={[0, -1.46 + i * 0.46, 0.08]}>
  //           <boxGeometry args={[8.05, 0.012, 0.014]} />
  //           <meshStandardMaterial color="#dce5ea" roughness={0.5} />
  //         </mesh>
  //       ))}

  //       <mesh position={[0, -1.66, 0.092]}>
  //         <boxGeometry args={[8.15, 0.12, 0.03]} />
  //         <meshStandardMaterial color="#cfd8dd" roughness={0.35} />
  //       </mesh>
  //     </group>
  //   );
  // }

  // function SideWalls() {
  //   return (
  //     <group>
  //       <RoundedBox
  //         args={[0.14, ROOM.height, ROOM.depth]}
  //         radius={0.06}
  //         smoothness={5}
  //         position={[ROOM.leftX, ROOM.height / 2, 0]}
  //         receiveShadow
  //       >
  //         <meshStandardMaterial color="#f5f9fa" roughness={0.4} />
  //       </RoundedBox>

  //       <RoundedBox
  //         args={[0.14, ROOM.height, ROOM.depth]}
  //         radius={0.06}
  //         smoothness={5}
  //         position={[ROOM.rightX, ROOM.height / 2, 0]}
  //         receiveShadow
  //       >
  //         <meshStandardMaterial color="#f5f9fa" roughness={0.4} />
  //       </RoundedBox>

  //       {[-1, 1].map((side) =>
  //         Array.from({ length: 8 }).map((_, i) => (
  //           <mesh key={`side-wall-line-${side}-${i}`} position={[side * 4.13, -0.02 + i * 0.46, 0]}>
  //             <boxGeometry args={[0.015, 0.01, 5.85]} />
  //             <meshStandardMaterial color="#dce5ea" roughness={0.5} />
  //           </mesh>
  //         ))
  //       )}
  //     </group>
  //   );
  // }

  // function CeilingFrame() {
  //   return (
  //     <group>
  //       <mesh position={[0, ROOM.height + 0.04, -3.0]} castShadow>
  //         <boxGeometry args={[8.45, 0.1, 0.18]} />
  //         <meshStandardMaterial color="#e9eef2" roughness={0.42} />
  //       </mesh>
  //       <mesh position={[0, ROOM.height + 0.04, 3.02]} castShadow>
  //         <boxGeometry args={[8.45, 0.1, 0.18]} />
  //         <meshStandardMaterial color="#e9eef2" roughness={0.42} />
  //       </mesh>
  //       <mesh position={[-4.12, ROOM.height + 0.04, 0]} castShadow>
  //         <boxGeometry args={[0.18, 0.1, 6.05]} />
  //         <meshStandardMaterial color="#e9eef2" roughness={0.42} />
  //       </mesh>
  //       <mesh position={[4.12, ROOM.height + 0.04, 0]} castShadow>
  //         <boxGeometry args={[0.18, 0.1, 6.05]} />
  //         <meshStandardMaterial color="#e9eef2" roughness={0.42} />
  //       </mesh>
  //     </group>
  //   );
  // }

  // function Door() {
  //   return (
  //     <group position={[0.05, 1.18, ROOM.backZ + 0.08]}>
  //       <RoundedBox args={[1.05, 2.35, 0.08]} radius={0.035} smoothness={5} castShadow>
  //         <meshStandardMaterial color="#1e293b" roughness={0.48} />
  //       </RoundedBox>

  //       <RoundedBox args={[1.18, 2.5, 0.05]} radius={0.04} smoothness={5} position={[0, 0, -0.04]}>
  //         <meshStandardMaterial color="#cbd5e1" roughness={0.35} metalness={0.25} />
  //       </RoundedBox>

  //       <mesh position={[0.36, 0.02, 0.08]} castShadow>
  //         <sphereGeometry args={[0.055, 28, 18]} />
  //         <meshStandardMaterial color="#d9a441" roughness={0.18} metalness={0.7} />
  //       </mesh>

  //       <mesh position={[0, -1.1, 0.09]}>
  //         <boxGeometry args={[0.82, 0.035, 0.015]} />
  //         <meshStandardMaterial color="#64748b" roughness={0.32} />
  //       </mesh>
  //     </group>
  //   );
  // }

  // function CeilingLight({ active }) {
  //   const lightRef = useRef();
  //   const bulbRef = useRef();

  //   useFrame(({ clock }) => {
  //     if (lightRef.current) {
  //       const base = active ? 7.2 : 1.7;
  //       lightRef.current.intensity = base + (active ? Math.sin(clock.elapsedTime * 5.2) * 0.25 : 0);
  //     }
  //     if (bulbRef.current) {
  //       bulbRef.current.emissiveIntensity = active ? 1.9 : 0.18;
  //     }
  //   });

  //   return (
  //     <group position={[-1.6, ROOM.height - 0.12, -0.8]}>
  //       <pointLight ref={lightRef} intensity={active ? 7.2 : 1.7} distance={8.5} color={active ? "#fff7d6" : "#ffffff"} />

  //       <RoundedBox args={[1.35, 0.08, 0.45]} radius={0.05} smoothness={8} castShadow>
  //         <meshStandardMaterial
  //           ref={bulbRef}
  //           color={active ? "#fff2a6" : "#e2e8f0"}
  //           emissive={active ? "#facc15" : "#ffffff"}
  //           emissiveIntensity={active ? 1.9 : 0.18}
  //           roughness={0.18}
  //         />
  //       </RoundedBox>

  //       {active && (
  //         <mesh position={[0, -1.52, 0]} rotation={[Math.PI / 2, 0, 0]}>
  //           <circleGeometry args={[2.1, 72]} />
  //           <meshBasicMaterial color="#fff3a3" transparent opacity={0.15} />
  //         </mesh>
  //       )}
  //     </group>
  //   );
  // }

  // function CeilingFan({ active }) {
  //   const fanRef = useRef();
  //   const speedRef = useRef(0.35);

  //   useFrame((_, delta) => {
  //     if (!fanRef.current) return;
  //     const target = active ? 22 : 0.28;
  //     speedRef.current += (target - speedRef.current) * Math.min(delta * 2.7, 1);
  //     fanRef.current.rotation.y += speedRef.current * delta;
  //   });

  //   return (
  //     <group position={[1.2, ROOM.height - 0.18, 0.2]}>
  //       <mesh position={[0, 0.22, 0]} castShadow>
  //         <cylinderGeometry args={[0.035, 0.035, 0.44, 32]} />
  //         <meshStandardMaterial color="#475569" roughness={0.2} metalness={0.75} />
  //       </mesh>

  //       <mesh castShadow>
  //         <cylinderGeometry args={[0.18, 0.23, 0.12, 48]} />
  //         <meshStandardMaterial color="#334155" roughness={0.25} metalness={0.55} />
  //       </mesh>

  //       <group ref={fanRef}>
  //         {[0, 1, 2].map((i) => (
  //           <group key={`fan-blade-${i}`} rotation={[0, (Math.PI * 2 * i) / 3, 0]}>
  //             <RoundedBox args={[1.32, 0.035, 0.22]} radius={0.08} smoothness={6} position={[0.72, 0, 0]} castShadow>
  //               <meshStandardMaterial color="#64748b" roughness={0.32} metalness={0.25} />
  //             </RoundedBox>
  //           </group>
  //         ))}
  //       </group>

  //       {active && (
  //         <mesh rotation={[Math.PI / 2, 0, 0]}>
  //           <torusGeometry args={[1.35, 0.012, 16, 128]} />
  //           <meshBasicMaterial color="#93c5fd" transparent opacity={0.22} />
  //         </mesh>
  //       )}
  //     </group>
  //   );
  // }

  // function BasinArea() {
  //   return (
  //     <group position={[-2.9, 0, ROOM.backZ + 0.28]}>
  //       <RoundedBox args={[1.55, 0.74, 0.55]} radius={0.08} smoothness={8} position={[0, 0.38, 0.22]} castShadow receiveShadow>
  //         <meshStandardMaterial color="#d7e3e8" roughness={0.38} />
  //       </RoundedBox>

  //       <RoundedBox args={[1.68, 0.16, 0.74]} radius={0.08} smoothness={8} position={[0, 0.84, 0.22]} castShadow>
  //         <meshStandardMaterial color="#ffffff" roughness={0.18} />
  //       </RoundedBox>

  //       <mesh position={[0, 0.92, 0.24]} castShadow>
  //         <cylinderGeometry args={[0.45, 0.34, 0.16, 64]} />
  //         <meshStandardMaterial color="#f8fafc" roughness={0.12} metalness={0.02} />
  //       </mesh>

  //       <mesh position={[0, 0.99, 0.24]} rotation={[Math.PI / 2, 0, 0]}>
  //         <torusGeometry args={[0.37, 0.04, 18, 72]} />
  //         <meshStandardMaterial color="#ffffff" roughness={0.12} />
  //       </mesh>

  //       <mesh position={[0, 0.99, 0.24]}>
  //         <cylinderGeometry args={[0.06, 0.06, 0.012, 24]} />
  //         <meshStandardMaterial color="#64748b" roughness={0.2} metalness={0.8} />
  //       </mesh>

  //       <mesh position={[0.42, 1.1, 0.02]} rotation={[Math.PI / 2, 0, 0]} castShadow>
  //         <torusGeometry args={[0.16, 0.025, 16, 52]} />
  //         <meshStandardMaterial color="#475569" roughness={0.16} metalness={0.85} />
  //       </mesh>

  //       <RoundedBox args={[1.35, 0.9, 0.045]} radius={0.08} smoothness={8} position={[0, 1.85, -0.02]}>
  //         <meshPhysicalMaterial color="#b7d6e8" roughness={0.08} metalness={0.5} transparent opacity={0.82} />
  //       </RoundedBox>

  //       <RoundedBox args={[1.48, 1.03, 0.035]} radius={0.08} smoothness={8} position={[0, 1.85, -0.045]}>
  //         <meshStandardMaterial color="#94a3b8" roughness={0.22} metalness={0.35} />
  //       </RoundedBox>
  //     </group>
  //   );
  // }

  // function ToiletArea() {
  //   return (
  //     <group position={TOILET_POSITION}>
  //       <mesh castShadow receiveShadow position={[0, 0.22, 0.12]}>
  //         <cylinderGeometry args={[0.24, 0.34, 0.34, 48]} />
  //         <meshStandardMaterial color="#f8fafc" roughness={0.12} metalness={0.04} />
  //       </mesh>

  //       <mesh castShadow position={[0, 0.52, 0.12]} scale={[1.15, 0.62, 0.88]}>
  //         <sphereGeometry args={[0.46, 64, 28]} />
  //         <meshStandardMaterial color="#ffffff" roughness={0.09} metalness={0.02} />
  //       </mesh>

  //       <mesh position={[0, 0.61, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
  //         <torusGeometry args={[0.34, 0.055, 24, 96]} />
  //         <meshStandardMaterial color="#f8fafc" roughness={0.12} />
  //       </mesh>

  //       <mesh position={[0, 0.595, 0.12]} scale={[1.1, 1, 0.75]}>
  //         <cylinderGeometry args={[0.26, 0.26, 0.018, 64]} />
  //         <meshStandardMaterial color="#8bd4f7" transparent opacity={0.74} roughness={0.05} />
  //       </mesh>

  //       <RoundedBox
  //         args={[0.82, 0.72, 0.26]}
  //         radius={0.07}
  //         smoothness={8}
  //         position={[0, 1.13, -0.48]}
  //         castShadow
  //       >
  //         <meshStandardMaterial color="#f8fafc" roughness={0.12} />
  //       </RoundedBox>

  //       <RoundedBox args={[0.88, 0.07, 0.31]} radius={0.035} smoothness={8} position={[0, 1.52, -0.48]} castShadow>
  //         <meshStandardMaterial color="#eef5f8" roughness={0.16} />
  //       </RoundedBox>

  //       <RoundedBox args={[0.72, 0.045, 0.62]} radius={0.055} smoothness={8} position={[0, 0.77, -0.2]} rotation={[-0.72, 0, 0]} castShadow>
  //         <meshStandardMaterial color="#f8fafc" roughness={0.11} />
  //       </RoundedBox>

  //       <mesh position={[0.22, 1.57, -0.35]} castShadow>
  //         <cylinderGeometry args={[0.04, 0.04, 0.03, 24]} />
  //         <meshStandardMaterial color="#94a3b8" roughness={0.12} metalness={0.75} />
  //       </mesh>

  //       <mesh position={[0.51, 0.66, -0.43]} rotation={[0, 0, Math.PI / 2]} castShadow>
  //         <cylinderGeometry args={[0.025, 0.025, 0.75, 18]} />
  //         <meshStandardMaterial color="#cbd5e1" roughness={0.2} metalness={0.55} />
  //       </mesh>

  //       <RoundedBox args={[0.5, 0.08, 0.16]} radius={0.025} smoothness={5} position={[0.48, 1.18, -0.68]} castShadow>
  //         <meshStandardMaterial color="#d7e3e8" roughness={0.18} metalness={0.28} />
  //       </RoundedBox>
  //     </group>
  //   );
  // }

  // function FlushDrop({ index }) {
  //   const refObj = useRef();

  //   useFrame(({ clock }) => {
  //     if (!refObj.current) return;
  //     const t = (clock.elapsedTime * 2.1 + index * 0.065) % 1;
  //     const angle = t * Math.PI * 2.2 + index * 0.65;

  //     refObj.current.position.x = Math.cos(angle) * (0.16 + t * 0.18);
  //     refObj.current.position.z = Math.sin(angle) * (0.12 + t * 0.15);
  //     refObj.current.position.y = 0.04 + Math.sin(t * Math.PI) * 0.14;
  //     refObj.current.scale.setScalar(0.55 + Math.sin(t * Math.PI) * 0.5);
  //   });

  //   return (
  //     <mesh ref={refObj}>
  //       <sphereGeometry args={[0.022, 12, 10]} />
  //       <meshStandardMaterial color="#0ea5e9" emissive="#7dd3fc" emissiveIntensity={0.75} transparent opacity={0.86} />
  //     </mesh>
  //   );
  // }

  // function FlushEffect({ active }) {
  //   const ring = useRef();
  //   useFrame((_, delta) => {
  //     if (ring.current) ring.current.rotation.z -= delta * 7;
  //   });

  //   if (!active) return null;

  //   return (
  //     <group position={[TOILET_POSITION[0], 0.63, TOILET_POSITION[2] + 0.12]}>
  //       <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
  //         <torusGeometry args={[0.34, 0.028, 18, 110]} />
  //         <meshStandardMaterial color="#0284c7" emissive="#38bdf8" emissiveIntensity={1.0} transparent opacity={0.86} />
  //       </mesh>

  //       <mesh position={[0, -0.05, 0]}>
  //         <cylinderGeometry args={[0.2, 0.09, 0.28, 48]} />
  //         <meshStandardMaterial color="#7dd3fc" transparent opacity={0.48} />
  //       </mesh>

  //       {Array.from({ length: 26 }).map((_, i) => (
  //         <FlushDrop key={i} index={i} />
  //       ))}
  //     </group>
  //   );
  // }

  // function SprayDrop({ index }) {
  //   const drop = useRef();

  //   useFrame(({ clock }) => {
  //     if (!drop.current) return;
  //     const t = (clock.elapsedTime * 2.55 + index * 0.045) % 1;

  //     drop.current.position.x = -0.04 - t * 0.92 + Math.sin(index * 1.4) * 0.035;
  //     drop.current.position.y = -0.03 - t * 0.52 + Math.sin(index * 1.5) * 0.045;
  //     drop.current.position.z = 0.08 + t * 0.78 + Math.cos(index * 1.2 + t * 2.4) * 0.08;
  //     drop.current.scale.setScalar(0.92 - t * 0.42);
  //   });

  //   return (
  //     <mesh ref={drop}>
  //       <sphereGeometry args={[0.023 + (index % 3) * 0.003, 10, 10]} />
  //       <meshStandardMaterial color="#38bdf8" emissive="#7dd3fc" emissiveIntensity={0.85} transparent opacity={0.88} />
  //     </mesh>
  //   );
  // }

  // function SpraySystem({ active }) {
  //   const head = useRef();

  //   useFrame(({ clock }) => {
  //     if (head.current) head.current.rotation.z = -0.34 + (active ? Math.sin(clock.elapsedTime * 3) * 0.045 : 0);
  //   });

  //   return (
  //     <group position={[2.9, 1.23, ROOM.backZ + 0.18]}>
  //       <RoundedBox args={[0.54, 0.28, 0.08]} radius={0.045} smoothness={7} position={[0, 0.05, 0]} castShadow>
  //         <meshStandardMaterial color="#e8f0f4" roughness={0.18} metalness={0.16} />
  //       </RoundedBox>

  //       <mesh position={[0.17, 0.05, 0.07]} rotation={[Math.PI / 2, 0, 0]} castShadow>
  //         <cylinderGeometry args={[0.075, 0.075, 0.12, 28]} />
  //         <meshStandardMaterial color="#64748b" metalness={0.7} roughness={0.16} />
  //       </mesh>

  //       <mesh position={[-0.08, -0.3, 0.19]} rotation={[0.38, 0, 0.08]} castShadow>
  //         <cylinderGeometry args={[0.025, 0.025, 0.78, 24]} />
  //         <meshStandardMaterial color="#64748b" metalness={0.72} roughness={0.2} />
  //       </mesh>

  //       <mesh position={[-0.18, -0.66, 0.48]} rotation={[Math.PI / 2, 0, 0.12]} castShadow>
  //         <torusGeometry args={[0.34, 0.018, 16, 72, Math.PI * 1.42]} />
  //         <meshStandardMaterial color="#334155" metalness={0.5} roughness={0.24} />
  //       </mesh>

  //       <mesh position={[0.18, -0.07, 0.11]} rotation={[Math.PI / 2, 0, 0]} castShadow>
  //         <cylinderGeometry args={[0.03, 0.03, 0.22, 24]} />
  //         <meshStandardMaterial color="#94a3b8" metalness={0.75} roughness={0.15} />
  //       </mesh>

  //       <group ref={head} position={[-0.3, -0.08, 0.52]} rotation={[0.2, 0.1, -0.34]}>
  //         <RoundedBox args={[0.15, 0.44, 0.13]} radius={0.04} smoothness={7} castShadow>
  //           <meshStandardMaterial color="#dce8ee" metalness={0.5} roughness={0.18} />
  //         </RoundedBox>

  //         <mesh position={[0, 0.29, 0.03]} rotation={[Math.PI / 2, 0, 0]} castShadow>
  //           <coneGeometry args={[0.12, 0.22, 32]} />
  //           <meshStandardMaterial color="#475569" metalness={0.58} roughness={0.16} />
  //         </mesh>

  //         <mesh position={[0, -0.25, -0.02]} castShadow>
  //           <cylinderGeometry args={[0.04, 0.055, 0.16, 24]} />
  //           <meshStandardMaterial color="#64748b" metalness={0.66} roughness={0.18} />
  //         </mesh>
  //       </group>

  //       {active && (
  //         <group position={[-0.31, 0.08, 0.62]}>
  //           {Array.from({ length: 46 }).map((_, i) => (
  //             <SprayDrop key={i} index={i} />
  //           ))}
  //         </group>
  //       )}
  //     </group>
  //   );
  // }

  // function WaterTank({ value }) {
  //   const level = Math.max(0, Math.min(100, Number(value) || 0));
  //   const fillHeight = 0.94 * (level / 100);

  //   return (
  //     <group position={[3.38, 1.55, 1.58]}>
  //       <RoundedBox args={[0.68, 1.18, 0.42]} radius={0.055} smoothness={8} castShadow>
  //         <meshPhysicalMaterial color="#dff4ff" roughness={0.04} metalness={0.04} transparent opacity={0.5} />
  //       </RoundedBox>

  //       <mesh position={[0, -0.47 + fillHeight / 2, 0]}>
  //         <boxGeometry args={[0.56, fillHeight, 0.32]} />
  //         <meshStandardMaterial color="#0ea5e9" transparent opacity={0.66} />
  //       </mesh>

  //       <mesh position={[0, -0.67, 0]} rotation={[Math.PI / 2, 0, 0]}>
  //         <torusGeometry args={[0.27, 0.017, 12, 60]} />
  //         <meshStandardMaterial color="#64748b" metalness={0.6} roughness={0.2} />
  //       </mesh>
  //     </group>
  //   );
  // }

  // function GasCloud({ value }) {
  //   if (value < 500) return null;

  //   const high = value >= 2500;
  //   const count = high ? 40 : 18;

  //   return (
  //     <group position={[1.85, 1.28, -0.35]}>
  //       {Array.from({ length: count }).map((_, i) => (
  //         <GasBubble key={i} index={i} high={high} />
  //       ))}
  //     </group>
  //   );
  // }

  // function GasBubble({ index, high }) {
  //   const bubble = useRef();

  //   useFrame(({ clock }) => {
  //     if (!bubble.current) return;
  //     bubble.current.position.y = Math.cos(clock.elapsedTime * 0.85 + index) * 0.22 + index * 0.004;
  //     bubble.current.rotation.y += 0.006;
  //   });

  //   return (
  //     <mesh
  //       ref={bubble}
  //       position={[Math.sin(index * 1.4) * 0.74, Math.cos(index * 0.8) * 0.38, Math.sin(index * 2.1) * 0.55]}
  //     >
  //       <sphereGeometry args={[0.07 + (index % 4) * 0.014, 16, 12]} />
  //       <meshStandardMaterial
  //         color={high ? "#fb7185" : "#94a3b8"}
  //         transparent
  //         opacity={high ? 0.38 : 0.18}
  //         emissive={high ? "#be123c" : "#000000"}
  //         emissiveIntensity={high ? 0.45 : 0}
  //       />
  //     </mesh>
  //   );
  // }

  // function HumanModel({ detected }) {
  //   const human = useRef();
  //   const shadowRef = useRef();

  //   useFrame(({ clock }) => {
  //     if (!human.current) return;
  //     const breathe = Math.sin(clock.elapsedTime * 1.2) * 0.01;
  //     human.current.position.y = breathe;
  //     human.current.rotation.y = 0.42 + Math.sin(clock.elapsedTime * 0.38) * 0.02;
  //     if (shadowRef.current) {
  //       shadowRef.current.material.opacity = 0.16 + Math.sin(clock.elapsedTime * 1.2) * 0.012;
  //       shadowRef.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 1.2) * 0.015);
  //     }
  //   });

  //   if (!detected) return null;

  //   const skin = "#c7926b";
  //   const hair = "#171717";
  //   const shirt = "#223247";
  //   const shirtDark = "#162231";
  //   const trouser = "#1f2937";
  //   const shoe = "#111827";

  //   return (
  //     <group position={[-1.18, 0.03, 0.95]} scale={[0.82, 0.82, 0.82]}>
  //       <mesh ref={shadowRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0.05]} receiveShadow>
  //         <circleGeometry args={[0.42, 64]} />
  //         <meshBasicMaterial color="#0f172a" transparent opacity={0.16} />
  //       </mesh>

  //       <group ref={human}>
  //         <RoundedBox args={[0.18, 0.07, 0.3]} radius={0.022} smoothness={5} position={[-0.1, 0.065, 0.06]} castShadow>
  //           <meshStandardMaterial color={shoe} roughness={0.72} />
  //         </RoundedBox>
  //         <RoundedBox args={[0.18, 0.07, 0.3]} radius={0.022} smoothness={5} position={[0.1, 0.065, 0.06]} castShadow>
  //           <meshStandardMaterial color={shoe} roughness={0.72} />
  //         </RoundedBox>

  //         <mesh castShadow position={[-0.1, 0.39, 0]}>
  //           <capsuleGeometry args={[0.062, 0.62, 10, 20]} />
  //           <meshStandardMaterial color={trouser} roughness={0.68} />
  //         </mesh>
  //         <mesh castShadow position={[0.1, 0.39, 0]}>
  //           <capsuleGeometry args={[0.062, 0.62, 10, 20]} />
  //           <meshStandardMaterial color={trouser} roughness={0.68} />
  //         </mesh>

  //         <RoundedBox args={[0.38, 0.14, 0.22]} radius={0.05} smoothness={7} position={[0, 0.77, 0]} castShadow>
  //           <meshStandardMaterial color={trouser} roughness={0.68} />
  //         </RoundedBox>

  //         <RoundedBox args={[0.42, 0.66, 0.24]} radius={0.08} smoothness={10} position={[0, 1.12, 0]} castShadow>
  //           <meshStandardMaterial color={shirt} roughness={0.6} />
  //         </RoundedBox>
  //         <mesh position={[0, 1.14, 0.126]}>
  //           <boxGeometry args={[0.18, 0.48, 0.012]} />
  //           <meshStandardMaterial color={shirtDark} roughness={0.62} />
  //         </mesh>
  //         <mesh position={[0, 0.83, 0.13]}>
  //           <boxGeometry args={[0.42, 0.03, 0.014]} />
  //           <meshStandardMaterial color="#0f172a" roughness={0.58} />
  //         </mesh>

  //         <mesh castShadow position={[-0.3, 1.12, 0.02]} rotation={[0.1, 0.05, 0.12]}>
  //           <capsuleGeometry args={[0.055, 0.5, 10, 18]} />
  //           <meshStandardMaterial color={shirt} roughness={0.62} />
  //         </mesh>
  //         <mesh castShadow position={[0.3, 1.12, 0.02]} rotation={[0.1, -0.05, -0.12]}>
  //           <capsuleGeometry args={[0.055, 0.5, 10, 18]} />
  //           <meshStandardMaterial color={shirt} roughness={0.62} />
  //         </mesh>

  //         <mesh castShadow position={[-0.33, 0.76, 0.05]} rotation={[0.05, 0, 0.02]}>
  //           <capsuleGeometry args={[0.042, 0.22, 8, 16]} />
  //           <meshStandardMaterial color={skin} roughness={0.46} />
  //         </mesh>
  //         <mesh castShadow position={[0.33, 0.76, 0.05]} rotation={[0.05, 0, -0.02]}>
  //           <capsuleGeometry args={[0.042, 0.22, 8, 16]} />
  //           <meshStandardMaterial color={skin} roughness={0.46} />
  //         </mesh>

  //         <mesh castShadow position={[0, 1.5, 0]}>
  //           <cylinderGeometry args={[0.058, 0.065, 0.14, 24]} />
  //           <meshStandardMaterial color={skin} roughness={0.44} />
  //         </mesh>

  //         <mesh castShadow position={[0, 1.7, 0.01]} scale={[0.9, 1.04, 0.88]}>
  //           <sphereGeometry args={[0.18, 34, 28]} />
  //           <meshStandardMaterial color={skin} roughness={0.43} />
  //         </mesh>

  //         <mesh position={[0, 1.77, -0.015]} scale={[0.98, 0.68, 0.96]}>
  //           <sphereGeometry args={[0.19, 32, 20, 0, Math.PI * 2, 0, Math.PI * 0.58]} />
  //           <meshStandardMaterial color={hair} roughness={0.8} />
  //         </mesh>
  //         <mesh position={[0, 1.72, -0.145]}>
  //           <boxGeometry args={[0.26, 0.11, 0.04]} />
  //           <meshStandardMaterial color={hair} roughness={0.8} />
  //         </mesh>

  //         <mesh position={[-0.145, 1.69, 0.01]}>
  //           <sphereGeometry args={[0.024, 12, 12]} />
  //           <meshStandardMaterial color={skin} roughness={0.45} />
  //         </mesh>
  //         <mesh position={[0.145, 1.69, 0.01]}>
  //           <sphereGeometry args={[0.024, 12, 12]} />
  //           <meshStandardMaterial color={skin} roughness={0.45} />
  //         </mesh>

  //         <mesh position={[-0.056, 1.73, 0.148]}>
  //           <sphereGeometry args={[0.017, 10, 10]} />
  //           <meshStandardMaterial color="#ffffff" roughness={0.2} />
  //         </mesh>
  //         <mesh position={[0.056, 1.73, 0.148]}>
  //           <sphereGeometry args={[0.017, 10, 10]} />
  //           <meshStandardMaterial color="#ffffff" roughness={0.2} />
  //         </mesh>
  //         <mesh position={[-0.056, 1.73, 0.16]}>
  //           <sphereGeometry args={[0.008, 10, 10]} />
  //           <meshStandardMaterial color="#111827" />
  //         </mesh>
  //         <mesh position={[0.056, 1.73, 0.16]}>
  //           <sphereGeometry args={[0.008, 10, 10]} />
  //           <meshStandardMaterial color="#111827" />
  //         </mesh>

  //         <mesh position={[-0.056, 1.755, 0.14]} rotation={[0, 0, 0.12]}>
  //           <boxGeometry args={[0.045, 0.008, 0.008]} />
  //           <meshStandardMaterial color="#2b2118" roughness={0.85} />
  //         </mesh>
  //         <mesh position={[0.056, 1.755, 0.14]} rotation={[0, 0, -0.12]}>
  //           <boxGeometry args={[0.045, 0.008, 0.008]} />
  //           <meshStandardMaterial color="#2b2118" roughness={0.85} />
  //         </mesh>

  //         <mesh position={[0, 1.69, 0.164]} rotation={[0.22, 0, 0]}>
  //           <coneGeometry args={[0.018, 0.06, 12]} />
  //           <meshStandardMaterial color="#b97e59" roughness={0.48} />
  //         </mesh>
  //         <mesh position={[0, 1.63, 0.16]}>
  //           <boxGeometry args={[0.055, 0.008, 0.008]} />
  //           <meshStandardMaterial color="#8b5e4a" roughness={0.6} />
  //         </mesh>
  //       </group>
  //     </group>
  //   );
  // }

  // function PulsingBeam({ color, opacity }) {
  //   const ringRef = useRef();
  //   const glowRef = useRef();

  //   useFrame(({ clock }) => {
  //     const pulse = 0.82 + Math.sin(clock.elapsedTime * 2.4) * 0.18;
  //     if (ringRef.current) {
  //       ringRef.current.scale.setScalar(pulse);
  //       ringRef.current.material.opacity = opacity * (0.65 + Math.sin(clock.elapsedTime * 2.4) * 0.22);
  //     }
  //     if (glowRef.current) {
  //       glowRef.current.material.opacity = opacity * 0.42 * (0.7 + Math.sin(clock.elapsedTime * 2.4) * 0.18);
  //     }
  //   });

  //   return (
  //     <group>
  //       <mesh ref={glowRef} position={[0, 0, 0.01]}>
  //         <circleGeometry args={[0.36, 48]} />
  //         <meshBasicMaterial color={color} transparent opacity={opacity * 0.28} />
  //       </mesh>
  //       <mesh ref={ringRef} position={[0, 0, 0.018]}>
  //         <torusGeometry args={[0.33, 0.012, 12, 72]} />
  //         <meshBasicMaterial color={color} transparent opacity={opacity} />
  //       </mesh>
  //     </group>
  //   );
  // }

  // function SensorBeams({ pir, ultra }) {
  //   return (
  //     <group>
  //       {pir && (
  //         <group position={[-3.3, 2.05, ROOM.backZ + 0.19]}>
  //           <PulsingBeam color="#16a34a" opacity={0.55} />
  //         </group>
  //       )}

  //       {ultra && (
  //         <group position={[3.48, 1.62, ROOM.backZ + 0.19]}>
  //           <PulsingBeam color="#0284c7" opacity={0.5} />
  //         </group>
  //       )}
  //     </group>
  //   );
  // }

  // function RoomAccessories({ pir, ultra }) {
  //   return (
  //     <group>
  //       <RoundedBox args={[1.25, 0.72, 0.055]} radius={0.06} smoothness={6} position={[-3.25, 2.35, ROOM.backZ + 0.08]} castShadow>
  //         <meshPhysicalMaterial color="#c7e8f8" roughness={0.05} metalness={0.15} transparent opacity={0.78} />
  //       </RoundedBox>

  //       <group position={[2.95, 2.35, ROOM.backZ + 0.1]}>
  //         <mesh castShadow>
  //           <cylinderGeometry args={[0.32, 0.32, 0.06, 48]} />
  //           <meshStandardMaterial color="#e2e8f0" roughness={0.25} />
  //         </mesh>
  //         <mesh position={[0, 0, 0.045]}>
  //           <torusGeometry args={[0.32, 0.018, 12, 80]} />
  //           <meshStandardMaterial color="#334155" roughness={0.25} />
  //         </mesh>
  //         {[0, 1, 2].map((i) => (
  //           <mesh key={`exhaust-blade-${i}`} rotation={[0, 0, (Math.PI * 2 * i) / 3]} position={[0.11, 0, 0.07]}>
  //             <boxGeometry args={[0.25, 0.035, 0.012]} />
  //             <meshStandardMaterial color="#64748b" />
  //           </mesh>
  //         ))}
  //       </group>

  //       <RoundedBox args={[1.25, 0.03, 0.62]} radius={0.09} smoothness={8} position={[-0.1, 0.03, 1.72]} receiveShadow>
  //         <meshStandardMaterial color="#cbd5e1" roughness={0.5} />
  //       </RoundedBox>

  //       <group position={[-3.3, 2.05, ROOM.backZ + 0.13]}>
  //         <RoundedBox args={[0.32, 0.18, 0.08]} radius={0.035} smoothness={6} castShadow>
  //           <meshStandardMaterial color="#334155" roughness={0.33} />
  //         </RoundedBox>
  //         <mesh position={[0.09, 0, 0.055]}>
  //           <sphereGeometry args={[0.035, 18, 12]} />
  //           <meshStandardMaterial color={pir ? "#22c55e" : "#94a3b8"} emissive={pir ? "#22c55e" : "#000000"} emissiveIntensity={pir ? 1 : 0} />
  //         </mesh>
  //       </group>

  //       <group position={[3.48, 1.62, ROOM.backZ + 0.13]}>
  //         <RoundedBox args={[0.38, 0.2, 0.08]} radius={0.035} smoothness={6} castShadow>
  //           <meshStandardMaterial color="#334155" roughness={0.33} />
  //         </RoundedBox>
  //         {[-0.08, 0.08].map((x) => (
  //           <mesh key={`ultra-eye-${x}`} position={[x, 0, 0.055]}>
  //             <cylinderGeometry args={[0.04, 0.04, 0.02, 18]} />
  //             <meshStandardMaterial color={ultra ? "#38bdf8" : "#94a3b8"} emissive={ultra ? "#38bdf8" : "#000000"} emissiveIntensity={ultra ? 1 : 0} />
  //           </mesh>
  //         ))}
  //       </group>
  //     </group>
  //   );
  // }

  // function Washroom3D({ data }) {
  //   const humanDetected = data.PIR === 1 || data.Ultra === 1;
  //   const fanOn = data.Relay === 1;
  //   const lightOn = data.Relay === 2;
  //   const flushOn = data.Relay === 3;
  //   const sprayOn = data.Relay === 4;

  //   return (
  //     <div className="glass-card simulation-card realistic-simulation-card">
  //       <div className="section-head">
  //         <div>
  //           <h3>Smart Washroom 3D View</h3>
  //         </div>

  //         <label className={humanDetected ? "danger" : ""}>{humanDetected ? "OCCUPIED" : "EMPTY"}</label>
  //       </div>

  //       <div className="canvas-box realistic-canvas-box">
  //         <Canvas shadows camera={{ position: [8.6, 4.7, 8.9], fov: 31, near: 0.1, far: 100 }}>
  //           <color attach="background" args={["#f8fcff"]} />

  //           <ambientLight intensity={0.65} />
  //           <hemisphereLight intensity={0.75} color="#ffffff" groundColor="#dbeafe" />
  //           <directionalLight
  //             castShadow
  //             position={[3.8, 6.2, 4.8]}
  //             intensity={1.65}
  //             shadow-mapSize-width={2048}
  //             shadow-mapSize-height={2048}
  //             shadow-camera-left={-7}
  //             shadow-camera-right={7}
  //             shadow-camera-top={7}
  //             shadow-camera-bottom={-7}
  //           />
  //           <spotLight position={[-3.5, 5.2, 3.8]} angle={0.45} penumbra={0.45} intensity={0.8} castShadow />

  //           <group position={[0, -0.04, 0]} scale={[0.98, 0.98, 0.98]}>
  //             <FloorTiles />
  //             <BackWallTiles />
  //             <SideWalls />
  //             <CeilingFrame />
  //             <Door />
  //             <CeilingLight active={lightOn} />
  //             <CeilingFan active={fanOn} />
  //             <BasinArea />
  //             <ToiletArea />
  //             <FlushEffect active={flushOn} />
  //             <SpraySystem active={sprayOn} />
  //             <WaterTank value={data.Water} />
  //             <GasCloud value={data.Gas} />
  //             <HumanModel detected={humanDetected} />
  //             <SensorBeams pir={data.PIR === 1} ultra={data.Ultra === 1} />
  //             <RoomAccessories pir={data.PIR === 1} ultra={data.Ultra === 1} />
  //           </group>

  //           <ContactShadows position={[0, 0.018, 0.08]} opacity={0.38} scale={10.8} blur={2.9} far={6} />
  //           <OrbitControls enableZoom={false} enablePan={false} target={[0, 1.32, -0.42]} maxPolarAngle={Math.PI / 2.08} minPolarAngle={Math.PI / 5.3} />
  //         </Canvas>
  //       </div>

  //       <div className="device-row realistic-device-row">
  //         <div className={fanOn ? "on" : ""}>🌀 Fan</div>
  //         <div className={lightOn ? "on" : ""}>💡 Light</div>
  //         <div className={flushOn ? "on" : ""}>🚽 Flush</div>
  //         <div className={sprayOn ? "on" : ""}>🚿 Spray</div>
  //       </div>
  //     </div>
  //   );
  // }

  // /* ======================== MAIN APP ======================== */

  // export default function App() {
  //   const [data, setData] = useState(DEFAULT_DATA);
  //   const [history, setHistory] = useState([]);
  //   const [autoMode, setAutoMode] = useState(false);
  //   const [autoAction, setAutoAction] = useState("Auto mode is OFF");
  //   const [firebaseError, setFirebaseError] = useState("");

  //   const [thresholds, setThresholds] = useState({
  //     gasLow: 200,
  //     gasHigh: 2500,
  //     humLow: 30,
  //     humHigh: 70,
  //     tempLow: 18,
  //     tempHigh: 35,
  //     waterLow: 20,
  //     waterHigh: 90,
  //   });

  //   const autoBusyRef = useRef(false);
  //   const autoTimerRef = useRef(null);
  //   const humanWasDetectedRef = useRef(false);

  //   useEffect(() => {
  //     const washroomRef = ref(db, WASHROOM_PATH);

  //     const unsubscribe = onValue(
  //       washroomRef,
  //       (snapshot) => {
  //         const value = snapshot.val() || {};

  //         const updated = {
  //           Gas: toNumber(value.Gas),
  //           Hum: toNumber(value.Hum),
  //           PIR: toNumber(value.PIR),
  //           Relay: toNumber(value.Relay),
  //           Temp: toNumber(value.Temp),
  //           Ultra: toNumber(value.Ultra),
  //           Water: toNumber(value.Water),
  //         };

  //         setData(updated);

  //         const time = new Date().toLocaleTimeString([], {
  //           hour: "2-digit",
  //           minute: "2-digit",
  //           second: "2-digit",
  //         });

  //         setHistory((prev) =>
  //           [
  //             ...prev,
  //             {
  //               time,
  //               Gas: updated.Gas,
  //               Hum: updated.Hum,
  //               Temp: updated.Temp,
  //               Water: updated.Water,
  //             },
  //           ].slice(-35)
  //         );

  //         setFirebaseError("");
  //       },
  //       (error) => {
  //         setFirebaseError(error.message);
  //       }
  //     );

  //     return () => unsubscribe();
  //   }, []);

  //   async function writeRelay(value) {
  //     try {
  //       await set(ref(db, `${WASHROOM_PATH}/Relay`), Number(value));
  //       setFirebaseError("");
  //     } catch (error) {
  //       setFirebaseError(error.message);
  //     }
  //   }

  //   async function runAutoRelay(value, durationMs, actionText) {
  //     if (autoBusyRef.current) return;

  //     autoBusyRef.current = true;
  //     setAutoAction(actionText);
  //     await writeRelay(value);

  //     autoTimerRef.current = setTimeout(async () => {
  //       await writeRelay(0);
  //       setAutoAction("Waiting for next sensor condition...");
  //       autoBusyRef.current = false;
  //     }, durationMs);
  //   }

  //   useEffect(() => {
  //     if (!autoMode || autoBusyRef.current) return;

  //     const humanDetected = data.PIR === 1 || data.Ultra === 1;

  //     if (humanDetected) {
  //       humanWasDetectedRef.current = true;
  //     }

  //     if (data.Gas >= thresholds.gasHigh) {
  //       runAutoRelay(4, 10000, "Gas high → Spray ON for 10 seconds");
  //       return;
  //     }

  //     if (data.Hum >= thresholds.humHigh || data.Temp >= thresholds.tempHigh) {
  //       runAutoRelay(1, 10000, "Humidity/Temperature high → Fan ON for 10 seconds");
  //       return;
  //     }

  //     if (humanDetected) {
  //       runAutoRelay(2, 10000, "PIR/Ultrasonic detected → Light ON for 10 seconds");
  //       return;
  //     }

  //     if (humanWasDetectedRef.current && !humanDetected) {
  //       humanWasDetectedRef.current = false;
  //       runAutoRelay(3, 5000, "Human exited → Flush ON for 5 seconds");
  //     }
  //   }, [data, autoMode, thresholds]);

  //   async function handleModeChange() {
  //     const nextMode = !autoMode;
  //     setAutoMode(nextMode);

  //     if (nextMode) {
  //       setAutoAction("Auto mode started. Waiting for sensor condition...");
  //     } else {
  //       if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
  //       autoBusyRef.current = false;
  //       humanWasDetectedRef.current = false;
  //       setAutoAction("Manual mode enabled");
  //       await writeRelay(0);
  //     }
  //   }

  //   const humanDetected = data.PIR === 1 || data.Ultra === 1;

  //   const alerts = useMemo(() => {
  //     const list = [];

  //     if (data.Gas >= thresholds.gasHigh) list.push("Gas level is HIGH");
  //     if (data.Gas <= thresholds.gasLow) list.push("Gas level is LOW");

  //     if (data.Hum >= thresholds.humHigh) list.push("Humidity is HIGH");
  //     if (data.Hum <= thresholds.humLow) list.push("Humidity is LOW");

  //     if (data.Temp >= thresholds.tempHigh) list.push("Temperature is HIGH");
  //     if (data.Temp <= thresholds.tempLow) list.push("Temperature is LOW");

  //     if (data.Water >= thresholds.waterHigh) list.push("Water level is HIGH");
  //     if (data.Water <= thresholds.waterLow) list.push("Water level is LOW");

  //     if (humanDetected) list.push("Human detected inside washroom");
  //     if (data.Relay > 0) list.push(`${relayName(data.Relay)} is active`);

  //     return list;
  //   }, [data, thresholds, humanDetected]);

  //   return (
  //     <div className="app">
  //       <header className="hero">
  //         <div>
  //           <p className="kicker">IoT Based Public Washroom Monitoring</p>
  //           <h1>Smart Washroom Control Center</h1>
  //           {/* <p className="hero-text">
  //             Realtime Firebase dashboard with proper washroom simulation, relay automation,
  //             fan, light, flush, spray, human detection and alert monitoring.
  //           </p> */}

  //           <div className="hero-tags">
  //             <span>Firebase: /Public_Washroom</span>
  //             <span>Relay: {relayName(data.Relay)}</span>
  //             <span>{humanDetected ? "Human Detected" : "Washroom Empty"}</span>
  //           </div>
  //         </div>

  //         <div className="hero-side">
  //           <div className={`connection-box ${firebaseError ? "error" : ""}`}>
  //             <span></span>
  //             <div>
  //               <h3>{firebaseError ? "Firebase Error" : "Live Connected"}</h3>
  //               <p>{firebaseError ? "Check Firebase rules/config" : "Realtime Database active"}</p>
  //             </div>
  //           </div>

  //           <div className={`occupancy-box ${humanDetected ? "active" : ""}`}>
  //             <p>Occupancy</p>
  //             <h2>{humanDetected ? "Occupied" : "Empty"}</h2>
  //           </div>
  //         </div>
  //       </header>

  //       {firebaseError && <div className="error-box">Firebase Error: {firebaseError}</div>}

  //       <main className="main-grid">
  //         <section className="left-panel">
  //           <div className="values-grid">
  //             <ValueCard
  //               title="Gas"
  //               value={data.Gas}
  //               unit="ADC"
  //               icon="🌫️"
  //               status={getStatus(data.Gas, thresholds.gasLow, thresholds.gasHigh)}
  //             />

  //             <ValueCard
  //               title="Humidity"
  //               value={data.Hum}
  //               unit="%"
  //               icon="💧"
  //               status={getStatus(data.Hum, thresholds.humLow, thresholds.humHigh)}
  //             />

  //             <ValueCard
  //               title="Temperature"
  //               value={data.Temp}
  //               unit="°C"
  //               icon="🌡️"
  //               status={getStatus(data.Temp, thresholds.tempLow, thresholds.tempHigh)}
  //             />

  //             <ValueCard
  //               title="Water"
  //               value={data.Water}
  //               unit="%"
  //               icon="🚰"
  //               status={getStatus(data.Water, thresholds.waterLow, thresholds.waterHigh)}
  //             />
  //           </div>

  //           <div className="status-grid">
  //             <StatusCard
  //               title="PIR Sensor"
  //               value={data.PIR === 1 ? "Motion detected" : "No motion"}
  //               active={data.PIR === 1}
  //               icon="🚶"
  //             />

  //             <StatusCard
  //               title="Ultrasonic"
  //               value={data.Ultra === 1 ? "Obstacle detected" : "Clear"}
  //               active={data.Ultra === 1}
  //               icon="📡"
  //             />

  //             <StatusCard
  //               title="Human Status"
  //               value={humanDetected ? "Person inside" : "Washroom empty"}
  //               active={humanDetected}
  //               icon="👤"
  //             />

  //             <StatusCard
  //               title="Relay Status"
  //               value={relayName(data.Relay)}
  //               active={data.Relay > 0}
  //               icon="⚡"
  //             />
  //           </div>

  //           <div className="glass-card control-card">
  //             <div className="section-head">
  //               <div>
  //                 <h3>Manual / Auto Control</h3>
  //                 <p>Fan=1, Light=2, Flush=3, Spray=4, OFF=0</p>
  //               </div>

  //               <button
  //                 className={`mode-btn ${autoMode ? "auto" : ""}`}
  //                 onClick={handleModeChange}
  //               >
  //                 {autoMode ? "AUTO MODE ON" : "MANUAL MODE ON"}
  //               </button>
  //             </div>

  //             <div className="relay-grid">
  //               <button disabled={autoMode} onClick={() => writeRelay(1)}>
  //                 <span>🌀</span>
  //                 <b>Fan ON</b>
  //                 <small>Send 1</small>
  //               </button>

  //               <button disabled={autoMode} onClick={() => writeRelay(2)}>
  //                 <span>💡</span>
  //                 <b>Light ON</b>
  //                 <small>Send 2</small>
  //               </button>

  //               <button disabled={autoMode} onClick={() => writeRelay(3)}>
  //                 <span>🚽</span>
  //                 <b>Flush ON</b>
  //                 <small>Send 3</small>
  //               </button>

  //               <button disabled={autoMode} onClick={() => writeRelay(4)}>
  //                 <span>🚿</span>
  //                 <b>Spray ON</b>
  //                 <small>Send 4</small>
  //               </button>

  //               <button className="off" onClick={() => writeRelay(0)}>
  //                 <span>⛔</span>
  //                 <b>All OFF</b>
  //                 <small>Send 0</small>
  //               </button>
  //             </div>

  //             <div className="auto-action">
  //               <b>Auto Action</b>
  //               <p>{autoAction}</p>
  //             </div>
  //           </div>

  //           <div className="graphs-grid">
  //             <GraphCard title="Gas Graph" data={history} dataKey="Gas" unit="ADC" />
  //             <GraphCard title="Humidity Graph" data={history} dataKey="Hum" unit="%" />
  //             <GraphCard title="Temperature Graph" data={history} dataKey="Temp" unit="°C" />
  //             <GraphCard title="Water Graph" data={history} dataKey="Water" unit="%" />
  //           </div>
  //         </section>

  //         <section className="right-panel">
  //           <Washroom3D data={data} />

  //           <div className="glass-card alert-card">
  //             <div className="section-head">
  //               <div>
  //                 <h3>Alert Center</h3>
  //                 <p>High and low safety alerts</p>
  //               </div>
  //               <label className={alerts.length > 0 ? "danger" : ""}>{alerts.length}</label>
  //             </div>

  //             {alerts.length === 0 ? (
  //               <div className="ok-message">All values are normal. No alert detected.</div>
  //             ) : (
  //               <div className="alert-list">
  //                 {alerts.map((alert, index) => (
  //                   <div className="alert-row" key={index}>
  //                     <b>⚠</b>
  //                     <span>{alert}</span>
  //                   </div>
  //                 ))}
  //               </div>
  //             )}
  //           </div>

  //           <div className="glass-card threshold-card">
  //             <div className="section-head">
  //               <div>
  //                 <h3>Threshold Settings</h3>
  //                 <p>Change alert limits</p>
  //               </div>
  //             </div>

  //             <div className="threshold-grid">
  //               {[
  //                 ["Gas Low", "gasLow"],
  //                 ["Gas High", "gasHigh"],
  //                 ["Hum Low", "humLow"],
  //                 ["Hum High", "humHigh"],
  //                 ["Temp Low", "tempLow"],
  //                 ["Temp High", "tempHigh"],
  //                 ["Water Low", "waterLow"],
  //                 ["Water High", "waterHigh"],
  //               ].map(([label, key]) => (
  //                 <label key={key}>
  //                   {label}
  //                   <input
  //                     type="number"
  //                     value={thresholds[key]}
  //                     onChange={(e) =>
  //                       setThresholds({
  //                         ...thresholds,
  //                         [key]: Number(e.target.value),
  //                       })
  //                     }
  //                   />
  //                 </label>
  //               ))}
  //             </div>
  //           </div>
  //         </section>
  //       </main>
  //     </div>
  //   );
  // }




  
  import { useEffect, useMemo, useRef, useState } from "react";
  import { Canvas, useFrame } from "@react-three/fiber";
  import {
    ContactShadows,
    OrbitControls,
    RoundedBox,
  } from "@react-three/drei";
  import { onValue, ref, set } from "firebase/database";
  import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
  } from "recharts";
  import { db, WASHROOM_PATH } from "./firebase";
  import "./App.css";

  const DEFAULT_DATA = {
    Gas: 0,
    G_LED: 0,
    Hum: 0,
    IR: 0,
    PIR: 0,
    R_LED: 0,
    Relay: 0,
    Relay1: 0,
    Relay2: 0,
    Relay3: 0,
    Relay4: 0,
    Temp: 0,
    Ultra: 0,
    Water: 0,
  };

  function toNumber(value) {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }

  function activeRelayNames(data) {
    const active = [];
    if (data.Relay1 === 1 || data.Relay === 1) active.push("Fan");
    if (data.Relay2 === 1 || data.Relay === 2) active.push("Light");
    if (data.Relay3 === 1 || data.Relay === 3) active.push("Flush");
    if (data.Relay4 === 1 || data.Relay === 4) active.push("Spray");
    return active.length ? active.join(", ") : "All OFF";
  }

  function getStatus(value, low, high) {
    if (value <= low) return "low";
    if (value >= high) return "high";
    return "normal";
  }

  function statusText(status) {
    if (status === "high") return "HIGH ALERT";
    if (status === "low") return "LOW ALERT";
    return "NORMAL";
  }

  function ValueCard({ title, value, unit, icon, status }) {
    return (
      <div className={`value-card ${status}`}>
        <div className="value-bg"></div>

        <div className="value-top">
          <div>
            <p>{title}</p>
            <h2>
              {value}
              <span>{unit}</span>
            </h2>
          </div>

          <div className="value-icon">{icon}</div>
        </div>

        <div className="value-status">{statusText(status)}</div>
      </div>
    );
  }

  function StatusCard({ title, value, active, icon }) {
    return (
      <div className={`status-card ${active ? "active" : ""}`}>
        <div className="status-icon">{icon}</div>

        <div>
          <h4>{title}</h4>
          <p>{value}</p>
        </div>

        <span></span>
      </div>
    );
  }

  function GraphCard({ title, data, dataKey, unit }) {
    return (
      <div className="glass-card graph-card">
        <div className="section-head">
          <div>
            <h3>{title}</h3>
            <p>Realtime Firebase graph</p>
          </div>
          <label>LIVE</label>
        </div>

        <div className="chart-box">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`${dataKey}Fill`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.65} />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.04} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="4 4" stroke="#dbeafe" />
              <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 10 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
              <Tooltip
                contentStyle={{
                  background: "#ffffff",
                  border: "1px solid #cfe8ff",
                  borderRadius: "14px",
                  color: "#0f172a",
                  boxShadow: "0 12px 30px rgba(15,23,42,0.12)",
                }}
                formatter={(value) => [`${value} ${unit}`, title]}
              />
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke="#0284c7"
                strokeWidth={3}
                fill={`url(#${dataKey}Fill)`}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  /* ======================== 3D REALISTIC WASHROOM ======================== */

  const ROOM = {
    width: 8.4,
    depth: 6.2,
    height: 3.55,
    backZ: -3.05,
    leftX: -4.2,
    rightX: 4.2,
  };

  const TOILET_POSITION = [2.35, 0.03, -2.18];

  function FloorTiles() {
    return (
      <group>
        <RoundedBox
          args={[ROOM.width, 0.12, ROOM.depth]}
          radius={0.06}
          smoothness={5}
          position={[0, -0.06, 0]}
          receiveShadow
        >
          <meshStandardMaterial color="#f2f6f7" roughness={0.42} metalness={0.02} />
        </RoundedBox>

        {Array.from({ length: 15 }).map((_, i) => (
          <mesh key={`floor-line-x-${i}`} position={[-4.05 + i * 0.58, 0.014, 0]} receiveShadow>
            <boxGeometry args={[0.012, 0.012, 5.95]} />
            <meshStandardMaterial color="#cbd7dc" roughness={0.55} />
          </mesh>
        ))}

        {Array.from({ length: 11 }).map((_, i) => (
          <mesh key={`floor-line-z-${i}`} position={[0, 0.016, -2.85 + i * 0.58]} receiveShadow>
            <boxGeometry args={[8.1, 0.012, 0.012]} />
            <meshStandardMaterial color="#cbd7dc" roughness={0.55} />
          </mesh>
        ))}

        <RoundedBox args={[7.8, 0.035, 0.16]} radius={0.03} smoothness={4} position={[0, 0.035, -2.85]}>
          <meshStandardMaterial color="#d8e3e8" roughness={0.45} />
        </RoundedBox>
      </group>
    );
  }

  function BackWallTiles() {
    return (
      <group position={[0, ROOM.height / 2, ROOM.backZ]}>
        <RoundedBox args={[ROOM.width, ROOM.height, 0.14]} radius={0.06} smoothness={5} receiveShadow>
          <meshStandardMaterial color="#f9fbfb" roughness={0.38} />
        </RoundedBox>

        {Array.from({ length: 15 }).map((_, i) => (
          <mesh key={`back-tile-v-${i}`} position={[-4.0 + i * 0.57, 0, 0.076]}>
            <boxGeometry args={[0.012, 3.25, 0.014]} />
            <meshStandardMaterial color="#dce5ea" roughness={0.5} />
          </mesh>
        ))}

        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={`back-tile-h-${i}`} position={[0, -1.46 + i * 0.46, 0.08]}>
            <boxGeometry args={[8.05, 0.012, 0.014]} />
            <meshStandardMaterial color="#dce5ea" roughness={0.5} />
          </mesh>
        ))}

        <mesh position={[0, -1.66, 0.092]}>
          <boxGeometry args={[8.15, 0.12, 0.03]} />
          <meshStandardMaterial color="#cfd8dd" roughness={0.35} />
        </mesh>
      </group>
    );
  }

  function SideWalls() {
    return (
      <group>
        <RoundedBox
          args={[0.14, ROOM.height, ROOM.depth]}
          radius={0.06}
          smoothness={5}
          position={[ROOM.leftX, ROOM.height / 2, 0]}
          receiveShadow
        >
          <meshStandardMaterial color="#f5f9fa" roughness={0.4} />
        </RoundedBox>

        <RoundedBox
          args={[0.14, ROOM.height, ROOM.depth]}
          radius={0.06}
          smoothness={5}
          position={[ROOM.rightX, ROOM.height / 2, 0]}
          receiveShadow
        >
          <meshStandardMaterial color="#f5f9fa" roughness={0.4} />
        </RoundedBox>

        {[-1, 1].map((side) =>
          Array.from({ length: 8 }).map((_, i) => (
            <mesh key={`side-wall-line-${side}-${i}`} position={[side * 4.13, -0.02 + i * 0.46, 0]}>
              <boxGeometry args={[0.015, 0.01, 5.85]} />
              <meshStandardMaterial color="#dce5ea" roughness={0.5} />
            </mesh>
          ))
        )}
      </group>
    );
  }

  function CeilingFrame() {
    return (
      <group>
        <mesh position={[0, ROOM.height + 0.04, -3.0]} castShadow>
          <boxGeometry args={[8.45, 0.1, 0.18]} />
          <meshStandardMaterial color="#e9eef2" roughness={0.42} />
        </mesh>
        <mesh position={[0, ROOM.height + 0.04, 3.02]} castShadow>
          <boxGeometry args={[8.45, 0.1, 0.18]} />
          <meshStandardMaterial color="#e9eef2" roughness={0.42} />
        </mesh>
        <mesh position={[-4.12, ROOM.height + 0.04, 0]} castShadow>
          <boxGeometry args={[0.18, 0.1, 6.05]} />
          <meshStandardMaterial color="#e9eef2" roughness={0.42} />
        </mesh>
        <mesh position={[4.12, ROOM.height + 0.04, 0]} castShadow>
          <boxGeometry args={[0.18, 0.1, 6.05]} />
          <meshStandardMaterial color="#e9eef2" roughness={0.42} />
        </mesh>
      </group>
    );
  }

  function Door() {
    return (
      <group position={[0.05, 1.18, ROOM.backZ + 0.08]}>
        <RoundedBox args={[1.05, 2.35, 0.08]} radius={0.035} smoothness={5} castShadow>
          <meshStandardMaterial color="#1e293b" roughness={0.48} />
        </RoundedBox>

        <RoundedBox args={[1.18, 2.5, 0.05]} radius={0.04} smoothness={5} position={[0, 0, -0.04]}>
          <meshStandardMaterial color="#cbd5e1" roughness={0.35} metalness={0.25} />
        </RoundedBox>

        <mesh position={[0.36, 0.02, 0.08]} castShadow>
          <sphereGeometry args={[0.055, 28, 18]} />
          <meshStandardMaterial color="#d9a441" roughness={0.18} metalness={0.7} />
        </mesh>

        <mesh position={[0, -1.1, 0.09]}>
          <boxGeometry args={[0.82, 0.035, 0.015]} />
          <meshStandardMaterial color="#64748b" roughness={0.32} />
        </mesh>
      </group>
    );
  }

  function CeilingLight({ active }) {
    const lightRef = useRef();
    const bulbRef = useRef();

    useFrame(({ clock }) => {
      if (lightRef.current) {
        const base = active ? 7.2 : 1.7;
        lightRef.current.intensity = base + (active ? Math.sin(clock.elapsedTime * 5.2) * 0.25 : 0);
      }
      if (bulbRef.current) {
        bulbRef.current.emissiveIntensity = active ? 1.9 : 0.18;
      }
    });

    return (
      <group position={[-1.6, ROOM.height - 0.12, -0.8]}>
        <pointLight ref={lightRef} intensity={active ? 7.2 : 1.7} distance={8.5} color={active ? "#fff7d6" : "#ffffff"} />

        <RoundedBox args={[1.35, 0.08, 0.45]} radius={0.05} smoothness={8} castShadow>
          <meshStandardMaterial
            ref={bulbRef}
            color={active ? "#fff2a6" : "#e2e8f0"}
            emissive={active ? "#facc15" : "#ffffff"}
            emissiveIntensity={active ? 1.9 : 0.18}
            roughness={0.18}
          />
        </RoundedBox>

        {active && (
          <mesh position={[0, -1.52, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <circleGeometry args={[2.1, 72]} />
            <meshBasicMaterial color="#fff3a3" transparent opacity={0.15} />
          </mesh>
        )}
      </group>
    );
  }

  function CeilingFan({ active }) {
    const fanRef = useRef();
    const speedRef = useRef(0.35);

    useFrame((_, delta) => {
      if (!fanRef.current) return;
      const target = active ? 22 : 0.28;
      speedRef.current += (target - speedRef.current) * Math.min(delta * 2.7, 1);
      fanRef.current.rotation.y += speedRef.current * delta;
    });

    return (
      <group position={[1.2, ROOM.height - 0.18, 0.2]}>
        <mesh position={[0, 0.22, 0]} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 0.44, 32]} />
          <meshStandardMaterial color="#475569" roughness={0.2} metalness={0.75} />
        </mesh>

        <mesh castShadow>
          <cylinderGeometry args={[0.18, 0.23, 0.12, 48]} />
          <meshStandardMaterial color="#334155" roughness={0.25} metalness={0.55} />
        </mesh>

        <group ref={fanRef}>
          {[0, 1, 2].map((i) => (
            <group key={`fan-blade-${i}`} rotation={[0, (Math.PI * 2 * i) / 3, 0]}>
              <RoundedBox args={[1.32, 0.035, 0.22]} radius={0.08} smoothness={6} position={[0.72, 0, 0]} castShadow>
                <meshStandardMaterial color="#64748b" roughness={0.32} metalness={0.25} />
              </RoundedBox>
            </group>
          ))}
        </group>

        {active && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.35, 0.012, 16, 128]} />
            <meshBasicMaterial color="#93c5fd" transparent opacity={0.22} />
          </mesh>
        )}
      </group>
    );
  }

  function BasinArea() {
    return (
      <group position={[-2.9, 0, ROOM.backZ + 0.28]}>
        <RoundedBox args={[1.55, 0.74, 0.55]} radius={0.08} smoothness={8} position={[0, 0.38, 0.22]} castShadow receiveShadow>
          <meshStandardMaterial color="#d7e3e8" roughness={0.38} />
        </RoundedBox>

        <RoundedBox args={[1.68, 0.16, 0.74]} radius={0.08} smoothness={8} position={[0, 0.84, 0.22]} castShadow>
          <meshStandardMaterial color="#ffffff" roughness={0.18} />
        </RoundedBox>

        <mesh position={[0, 0.92, 0.24]} castShadow>
          <cylinderGeometry args={[0.45, 0.34, 0.16, 64]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.12} metalness={0.02} />
        </mesh>

        <mesh position={[0, 0.99, 0.24]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.37, 0.04, 18, 72]} />
          <meshStandardMaterial color="#ffffff" roughness={0.12} />
        </mesh>

        <mesh position={[0, 0.99, 0.24]}>
          <cylinderGeometry args={[0.06, 0.06, 0.012, 24]} />
          <meshStandardMaterial color="#64748b" roughness={0.2} metalness={0.8} />
        </mesh>

        <mesh position={[0.42, 1.1, 0.02]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[0.16, 0.025, 16, 52]} />
          <meshStandardMaterial color="#475569" roughness={0.16} metalness={0.85} />
        </mesh>

        <RoundedBox args={[1.35, 0.9, 0.045]} radius={0.08} smoothness={8} position={[0, 1.85, -0.02]}>
          <meshPhysicalMaterial color="#b7d6e8" roughness={0.08} metalness={0.5} transparent opacity={0.82} />
        </RoundedBox>

        <RoundedBox args={[1.48, 1.03, 0.035]} radius={0.08} smoothness={8} position={[0, 1.85, -0.045]}>
          <meshStandardMaterial color="#94a3b8" roughness={0.22} metalness={0.35} />
        </RoundedBox>
      </group>
    );
  }

  function ToiletArea() {
    return (
      <group position={TOILET_POSITION}>
        {/* Toilet pedestal */}
        <mesh castShadow receiveShadow position={[0, 0.2, 0.18]}>
          <cylinderGeometry args={[0.24, 0.36, 0.38, 64]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.16} />
        </mesh>

        {/* Main ceramic bowl */}
        <mesh castShadow position={[0, 0.5, 0.22]} scale={[1.08, 0.62, 1.34]}>
          <sphereGeometry args={[0.46, 64, 36]} />
          <meshStandardMaterial color="#ffffff" roughness={0.1} />
        </mesh>

        {/* Bowl inner opening */}
        <mesh position={[0, 0.66, 0.34]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1.42, 1]}>
          <torusGeometry args={[0.31, 0.055, 24, 96]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.12} />
        </mesh>

        {/* Water inside toilet */}
        <mesh position={[0, 0.645, 0.34]} scale={[1, 1, 1.38]}>
          <cylinderGeometry args={[0.245, 0.245, 0.022, 64]} />
          <meshStandardMaterial color="#7dd3fc" transparent opacity={0.68} roughness={0.04} />
        </mesh>

        {/* Toilet seat */}
        <mesh position={[0, 0.72, 0.31]} rotation={[Math.PI / 2, 0, 0]} scale={[1.06, 1.42, 1]} castShadow>
          <torusGeometry args={[0.34, 0.046, 24, 96]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.14} />
        </mesh>

        {/* Raised toilet lid */}
        <RoundedBox
          args={[0.68, 0.055, 0.68]}
          radius={0.08}
          smoothness={8}
          position={[0, 1.04, -0.08]}
          rotation={[-1.05, 0, 0]}
          castShadow
        >
          <meshStandardMaterial color="#f8fafc" roughness={0.12} />
        </RoundedBox>

        {/* Flush tank */}
        <RoundedBox
          args={[0.9, 0.78, 0.34]}
          radius={0.08}
          smoothness={8}
          position={[0, 1.22, -0.46]}
          castShadow
        >
          <meshStandardMaterial color="#f8fafc" roughness={0.14} />
        </RoundedBox>

        {/* Flush tank top cover */}
        <RoundedBox
          args={[0.96, 0.07, 0.4]}
          radius={0.035}
          smoothness={8}
          position={[0, 1.64, -0.46]}
          castShadow
        >
          <meshStandardMaterial color="#e8f1f5" roughness={0.18} />
        </RoundedBox>

        {/* Flush button */}
        <mesh position={[0.22, 1.69, -0.42]} castShadow>
          <cylinderGeometry args={[0.045, 0.045, 0.025, 28]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.12} metalness={0.72} />
        </mesh>

        {/* Water inlet pipe */}
        <mesh position={[0.48, 0.58, -0.42]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.024, 0.024, 0.64, 20]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.2} metalness={0.55} />
        </mesh>
      </group>
    );
  }

  function FlushDrop({ index }) {
    const refObj = useRef();

    useFrame(({ clock }) => {
      if (!refObj.current) return;
      const t = (clock.elapsedTime * 2.1 + index * 0.065) % 1;
      const angle = t * Math.PI * 2.2 + index * 0.65;

      refObj.current.position.x = Math.cos(angle) * (0.16 + t * 0.18);
      refObj.current.position.z = Math.sin(angle) * (0.12 + t * 0.15);
      refObj.current.position.y = 0.04 + Math.sin(t * Math.PI) * 0.14;
      refObj.current.scale.setScalar(0.55 + Math.sin(t * Math.PI) * 0.5);
    });

    return (
      <mesh ref={refObj}>
        <sphereGeometry args={[0.022, 12, 10]} />
        <meshStandardMaterial color="#0ea5e9" emissive="#7dd3fc" emissiveIntensity={0.75} transparent opacity={0.86} />
      </mesh>
    );
  }

  function FlushEffect({ active }) {
    const ring = useRef();
    useFrame((_, delta) => {
      if (ring.current) ring.current.rotation.z -= delta * 7;
    });

    if (!active) return null;

    return (
      <group
        position={[
          TOILET_POSITION[0],
          TOILET_POSITION[1] + 0.66,
          TOILET_POSITION[2] + 0.34,
        ]}
      >
        <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.34, 0.028, 18, 110]} />
          <meshStandardMaterial color="#0284c7" emissive="#38bdf8" emissiveIntensity={1.0} transparent opacity={0.86} />
        </mesh>

        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.2, 0.09, 0.28, 48]} />
          <meshStandardMaterial color="#7dd3fc" transparent opacity={0.48} />
        </mesh>

        {Array.from({ length: 26 }).map((_, i) => (
          <FlushDrop key={i} index={i} />
        ))}
      </group>
    );
  }

  function SprayDrop({ index }) {
    const drop = useRef();

    useFrame(({ clock }) => {
      if (!drop.current) return;

      const t = (clock.elapsedTime * 2.9 + index * 0.055) % 1;

      drop.current.position.x = -0.03 - t * 0.55 + Math.sin(index * 1.7) * 0.035;
      drop.current.position.y = -0.02 - t * 0.95;
      drop.current.position.z = 0.08 + t * 0.52 + Math.cos(index * 1.3) * 0.035;
      drop.current.scale.setScalar(0.95 - t * 0.5);
    });

    return (
      <mesh ref={drop}>
        <sphereGeometry args={[0.018 + (index % 3) * 0.0025, 10, 10]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#7dd3fc"
          emissiveIntensity={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>
    );
  }

 function SpraySystem({ active }) {
  const sprayHead = useRef();

  useFrame(({ clock }) => {
    if (!sprayHead.current) return;
    sprayHead.current.rotation.z =
      -0.28 + (active ? Math.sin(clock.elapsedTime * 4) * 0.035 : 0);
  });

  return (
    <group
      position={[3.78, 1.12, 0.65]}
      rotation={[0, -Math.PI / 2, 0]}
    >
      {/* Wall mounting plate */}
      <RoundedBox
        args={[0.08, 0.34, 0.56]}
        radius={0.045}
        smoothness={7}
        position={[0, 0.05, 0]}
        castShadow
      >
        <meshStandardMaterial
          color="#e8f0f4"
          roughness={0.2}
          metalness={0.18}
        />
      </RoundedBox>

      {/* Water outlet valve */}
      <mesh
        position={[-0.08, 0.06, 0.14]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
      >
        <cylinderGeometry args={[0.075, 0.075, 0.17, 32]} />
        <meshStandardMaterial
          color="#64748b"
          metalness={0.78}
          roughness={0.16}
        />
      </mesh>

      {/* Valve handle */}
      <mesh position={[-0.18, 0.06, 0.14]} castShadow>
        <torusGeometry args={[0.095, 0.014, 14, 56]} />
        <meshStandardMaterial
          color="#334155"
          metalness={0.72}
          roughness={0.18}
        />
      </mesh>

      {/* Spray holder */}
      <RoundedBox
        args={[0.12, 0.16, 0.18]}
        radius={0.035}
        smoothness={6}
        position={[-0.12, 0.35, -0.12]}
        castShadow
      >
        <meshStandardMaterial
          color="#94a3b8"
          roughness={0.18}
          metalness={0.65}
        />
      </RoundedBox>

      {/* Flexible hose */}
      <mesh
        position={[-0.2, -0.48, 0.02]}
        rotation={[Math.PI / 2, 0, 0.1]}
        castShadow
      >
        <torusGeometry args={[0.42, 0.022, 16, 88, Math.PI * 1.78]} />
        <meshStandardMaterial
          color="#475569"
          metalness={0.52}
          roughness={0.25}
        />
      </mesh>

      {/* Handheld spray */}
      <group
        ref={sprayHead}
        position={[-0.34, 0.43, -0.1]}
        rotation={[0.12, 0.12, -0.28]}
      >
        <RoundedBox
          args={[0.16, 0.48, 0.14]}
          radius={0.05}
          smoothness={8}
          castShadow
        >
          <meshStandardMaterial
            color="#dce8ee"
            metalness={0.52}
            roughness={0.18}
          />
        </RoundedBox>

        <mesh
          position={[0, 0.3, 0.03]}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
        >
          <coneGeometry args={[0.13, 0.22, 36]} />
          <meshStandardMaterial
            color="#475569"
            metalness={0.64}
            roughness={0.16}
          />
        </mesh>

        <RoundedBox
          args={[0.045, 0.2, 0.04]}
          radius={0.015}
          smoothness={5}
          position={[0.1, 0.02, 0.02]}
          rotation={[0, 0, -0.22]}
          castShadow
        >
          <meshStandardMaterial
            color="#334155"
            metalness={0.58}
            roughness={0.22}
          />
        </RoundedBox>

        <mesh position={[0, -0.31, -0.02]} castShadow>
          <cylinderGeometry args={[0.045, 0.06, 0.18, 24]} />
          <meshStandardMaterial
            color="#64748b"
            metalness={0.7}
            roughness={0.18}
          />
        </mesh>
      </group>

      {/* Water animation */}
      {active && (
        <group position={[-0.36, 0.69, -0.08]}>
          {Array.from({ length: 40 }).map((_, i) => (
            <SprayDrop key={i} index={i} />
          ))}
        </group>
      )}
    </group>
  );
}

  function WaterTank({ value }) {
    const level = Math.max(0, Math.min(100, Number(value) || 0));
    const fillHeight = 0.94 * (level / 100);

    return (
      <group position={[3.38, 1.55, 1.58]}>
        <RoundedBox args={[0.68, 1.18, 0.42]} radius={0.055} smoothness={8} castShadow>
          <meshPhysicalMaterial color="#dff4ff" roughness={0.04} metalness={0.04} transparent opacity={0.5} />
        </RoundedBox>

        <mesh position={[0, -0.47 + fillHeight / 2, 0]}>
          <boxGeometry args={[0.56, fillHeight, 0.32]} />
          <meshStandardMaterial color="#0ea5e9" transparent opacity={0.66} />
        </mesh>

        <mesh position={[0, -0.67, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.27, 0.017, 12, 60]} />
          <meshStandardMaterial color="#64748b" metalness={0.6} roughness={0.2} />
        </mesh>
      </group>
    );
  }

  function GasCloud({ value }) {
    if (value < 500) return null;

    const high = value >= 2500;
    const count = high ? 40 : 18;

    return (
      <group position={[1.85, 1.28, -0.35]}>
        {Array.from({ length: count }).map((_, i) => (
          <GasBubble key={i} index={i} high={high} />
        ))}
      </group>
    );
  }

  function GasBubble({ index, high }) {
    const bubble = useRef();

    useFrame(({ clock }) => {
      if (!bubble.current) return;
      bubble.current.position.y = Math.cos(clock.elapsedTime * 0.85 + index) * 0.22 + index * 0.004;
      bubble.current.rotation.y += 0.006;
    });

    return (
      <mesh
        ref={bubble}
        position={[Math.sin(index * 1.4) * 0.74, Math.cos(index * 0.8) * 0.38, Math.sin(index * 2.1) * 0.55]}
      >
        <sphereGeometry args={[0.07 + (index % 4) * 0.014, 16, 12]} />
        <meshStandardMaterial
          color={high ? "#fb7185" : "#94a3b8"}
          transparent
          opacity={high ? 0.38 : 0.18}
          emissive={high ? "#be123c" : "#000000"}
          emissiveIntensity={high ? 0.45 : 0}
        />
      </mesh>
    );
  }

  function HumanModel({ detected }) {
    const human = useRef();
    const shadowRef = useRef();

    useFrame(({ clock }) => {
      if (!human.current) return;
      const breathe = Math.sin(clock.elapsedTime * 1.2) * 0.01;
      human.current.position.y = breathe;
      human.current.rotation.y = 0.42 + Math.sin(clock.elapsedTime * 0.38) * 0.02;
      if (shadowRef.current) {
        shadowRef.current.material.opacity = 0.16 + Math.sin(clock.elapsedTime * 1.2) * 0.012;
        shadowRef.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 1.2) * 0.015);
      }
    });

    if (!detected) return null;

    const skin = "#c7926b";
    const hair = "#171717";
    const shirt = "#223247";
    const shirtDark = "#162231";
    const trouser = "#1f2937";
    const shoe = "#111827";

    return (
      <group position={[-1.18, 0.03, 0.95]} scale={[0.82, 0.82, 0.82]}>
        <mesh ref={shadowRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0.05]} receiveShadow>
          <circleGeometry args={[0.42, 64]} />
          <meshBasicMaterial color="#0f172a" transparent opacity={0.16} />
        </mesh>

        <group ref={human}>
          <RoundedBox args={[0.18, 0.07, 0.3]} radius={0.022} smoothness={5} position={[-0.1, 0.065, 0.06]} castShadow>
            <meshStandardMaterial color={shoe} roughness={0.72} />
          </RoundedBox>
          <RoundedBox args={[0.18, 0.07, 0.3]} radius={0.022} smoothness={5} position={[0.1, 0.065, 0.06]} castShadow>
            <meshStandardMaterial color={shoe} roughness={0.72} />
          </RoundedBox>

          <mesh castShadow position={[-0.1, 0.39, 0]}>
            <capsuleGeometry args={[0.062, 0.62, 10, 20]} />
            <meshStandardMaterial color={trouser} roughness={0.68} />
          </mesh>
          <mesh castShadow position={[0.1, 0.39, 0]}>
            <capsuleGeometry args={[0.062, 0.62, 10, 20]} />
            <meshStandardMaterial color={trouser} roughness={0.68} />
          </mesh>

          <RoundedBox args={[0.38, 0.14, 0.22]} radius={0.05} smoothness={7} position={[0, 0.77, 0]} castShadow>
            <meshStandardMaterial color={trouser} roughness={0.68} />
          </RoundedBox>

          <RoundedBox args={[0.42, 0.66, 0.24]} radius={0.08} smoothness={10} position={[0, 1.12, 0]} castShadow>
            <meshStandardMaterial color={shirt} roughness={0.6} />
          </RoundedBox>
          <mesh position={[0, 1.14, 0.126]}>
            <boxGeometry args={[0.18, 0.48, 0.012]} />
            <meshStandardMaterial color={shirtDark} roughness={0.62} />
          </mesh>
          <mesh position={[0, 0.83, 0.13]}>
            <boxGeometry args={[0.42, 0.03, 0.014]} />
            <meshStandardMaterial color="#0f172a" roughness={0.58} />
          </mesh>

          <mesh castShadow position={[-0.3, 1.12, 0.02]} rotation={[0.1, 0.05, 0.12]}>
            <capsuleGeometry args={[0.055, 0.5, 10, 18]} />
            <meshStandardMaterial color={shirt} roughness={0.62} />
          </mesh>
          <mesh castShadow position={[0.3, 1.12, 0.02]} rotation={[0.1, -0.05, -0.12]}>
            <capsuleGeometry args={[0.055, 0.5, 10, 18]} />
            <meshStandardMaterial color={shirt} roughness={0.62} />
          </mesh>

          <mesh castShadow position={[-0.33, 0.76, 0.05]} rotation={[0.05, 0, 0.02]}>
            <capsuleGeometry args={[0.042, 0.22, 8, 16]} />
            <meshStandardMaterial color={skin} roughness={0.46} />
          </mesh>
          <mesh castShadow position={[0.33, 0.76, 0.05]} rotation={[0.05, 0, -0.02]}>
            <capsuleGeometry args={[0.042, 0.22, 8, 16]} />
            <meshStandardMaterial color={skin} roughness={0.46} />
          </mesh>

          <mesh castShadow position={[0, 1.5, 0]}>
            <cylinderGeometry args={[0.058, 0.065, 0.14, 24]} />
            <meshStandardMaterial color={skin} roughness={0.44} />
          </mesh>

          <mesh castShadow position={[0, 1.7, 0.01]} scale={[0.9, 1.04, 0.88]}>
            <sphereGeometry args={[0.18, 34, 28]} />
            <meshStandardMaterial color={skin} roughness={0.43} />
          </mesh>

          <mesh position={[0, 1.77, -0.015]} scale={[0.98, 0.68, 0.96]}>
            <sphereGeometry args={[0.19, 32, 20, 0, Math.PI * 2, 0, Math.PI * 0.58]} />
            <meshStandardMaterial color={hair} roughness={0.8} />
          </mesh>
          <mesh position={[0, 1.72, -0.145]}>
            <boxGeometry args={[0.26, 0.11, 0.04]} />
            <meshStandardMaterial color={hair} roughness={0.8} />
          </mesh>

          <mesh position={[-0.145, 1.69, 0.01]}>
            <sphereGeometry args={[0.024, 12, 12]} />
            <meshStandardMaterial color={skin} roughness={0.45} />
          </mesh>
          <mesh position={[0.145, 1.69, 0.01]}>
            <sphereGeometry args={[0.024, 12, 12]} />
            <meshStandardMaterial color={skin} roughness={0.45} />
          </mesh>

          <mesh position={[-0.056, 1.73, 0.148]}>
            <sphereGeometry args={[0.017, 10, 10]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>
          <mesh position={[0.056, 1.73, 0.148]}>
            <sphereGeometry args={[0.017, 10, 10]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>
          <mesh position={[-0.056, 1.73, 0.16]}>
            <sphereGeometry args={[0.008, 10, 10]} />
            <meshStandardMaterial color="#111827" />
          </mesh>
          <mesh position={[0.056, 1.73, 0.16]}>
            <sphereGeometry args={[0.008, 10, 10]} />
            <meshStandardMaterial color="#111827" />
          </mesh>

          <mesh position={[-0.056, 1.755, 0.14]} rotation={[0, 0, 0.12]}>
            <boxGeometry args={[0.045, 0.008, 0.008]} />
            <meshStandardMaterial color="#2b2118" roughness={0.85} />
          </mesh>
          <mesh position={[0.056, 1.755, 0.14]} rotation={[0, 0, -0.12]}>
            <boxGeometry args={[0.045, 0.008, 0.008]} />
            <meshStandardMaterial color="#2b2118" roughness={0.85} />
          </mesh>

          <mesh position={[0, 1.69, 0.164]} rotation={[0.22, 0, 0]}>
            <coneGeometry args={[0.018, 0.06, 12]} />
            <meshStandardMaterial color="#b97e59" roughness={0.48} />
          </mesh>
          <mesh position={[0, 1.63, 0.16]}>
            <boxGeometry args={[0.055, 0.008, 0.008]} />
            <meshStandardMaterial color="#8b5e4a" roughness={0.6} />
          </mesh>
        </group>
      </group>
    );
  }

  function PulsingBeam({ color, opacity }) {
    const ringRef = useRef();
    const glowRef = useRef();

    useFrame(({ clock }) => {
      const pulse = 0.82 + Math.sin(clock.elapsedTime * 2.4) * 0.18;
      if (ringRef.current) {
        ringRef.current.scale.setScalar(pulse);
        ringRef.current.material.opacity = opacity * (0.65 + Math.sin(clock.elapsedTime * 2.4) * 0.22);
      }
      if (glowRef.current) {
        glowRef.current.material.opacity = opacity * 0.42 * (0.7 + Math.sin(clock.elapsedTime * 2.4) * 0.18);
      }
    });

    return (
      <group>
        <mesh ref={glowRef} position={[0, 0, 0.01]}>
          <circleGeometry args={[0.36, 48]} />
          <meshBasicMaterial color={color} transparent opacity={opacity * 0.28} />
        </mesh>
        <mesh ref={ringRef} position={[0, 0, 0.018]}>
          <torusGeometry args={[0.33, 0.012, 12, 72]} />
          <meshBasicMaterial color={color} transparent opacity={opacity} />
        </mesh>
      </group>
    );
  }

  function SensorBeams({ pir, ultra }) {
    return (
      <group>
        {pir && (
          <group position={[-3.3, 2.05, ROOM.backZ + 0.19]}>
            <PulsingBeam color="#16a34a" opacity={0.55} />
          </group>
        )}

        {ultra && (
          <group position={[3.48, 1.62, ROOM.backZ + 0.19]}>
            <PulsingBeam color="#0284c7" opacity={0.5} />
          </group>
        )}
      </group>
    );
  }

  function RoomAccessories({ pir, ultra }) {
    return (
      <group>
        <RoundedBox args={[1.25, 0.72, 0.055]} radius={0.06} smoothness={6} position={[-3.25, 2.35, ROOM.backZ + 0.08]} castShadow>
          <meshPhysicalMaterial color="#c7e8f8" roughness={0.05} metalness={0.15} transparent opacity={0.78} />
        </RoundedBox>

        <group position={[2.95, 2.35, ROOM.backZ + 0.1]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.32, 0.32, 0.06, 48]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.25} />
          </mesh>
          <mesh position={[0, 0, 0.045]}>
            <torusGeometry args={[0.32, 0.018, 12, 80]} />
            <meshStandardMaterial color="#334155" roughness={0.25} />
          </mesh>
          {[0, 1, 2].map((i) => (
            <mesh key={`exhaust-blade-${i}`} rotation={[0, 0, (Math.PI * 2 * i) / 3]} position={[0.11, 0, 0.07]}>
              <boxGeometry args={[0.25, 0.035, 0.012]} />
              <meshStandardMaterial color="#64748b" />
            </mesh>
          ))}
        </group>

        <RoundedBox args={[1.25, 0.03, 0.62]} radius={0.09} smoothness={8} position={[-0.1, 0.03, 1.72]} receiveShadow>
          <meshStandardMaterial color="#cbd5e1" roughness={0.5} />
        </RoundedBox>

        <group position={[-3.3, 2.05, ROOM.backZ + 0.13]}>
          <RoundedBox args={[0.32, 0.18, 0.08]} radius={0.035} smoothness={6} castShadow>
            <meshStandardMaterial color="#334155" roughness={0.33} />
          </RoundedBox>
          <mesh position={[0.09, 0, 0.055]}>
            <sphereGeometry args={[0.035, 18, 12]} />
            <meshStandardMaterial color={pir ? "#22c55e" : "#94a3b8"} emissive={pir ? "#22c55e" : "#000000"} emissiveIntensity={pir ? 1 : 0} />
          </mesh>
        </group>

        <group position={[3.48, 1.62, ROOM.backZ + 0.13]}>
          <RoundedBox args={[0.38, 0.2, 0.08]} radius={0.035} smoothness={6} castShadow>
            <meshStandardMaterial color="#334155" roughness={0.33} />
          </RoundedBox>
          {[-0.08, 0.08].map((x) => (
            <mesh key={`ultra-eye-${x}`} position={[x, 0, 0.055]}>
              <cylinderGeometry args={[0.04, 0.04, 0.02, 18]} />
              <meshStandardMaterial color={ultra ? "#38bdf8" : "#94a3b8"} emissive={ultra ? "#38bdf8" : "#000000"} emissiveIntensity={ultra ? 1 : 0} />
            </mesh>
          ))}
        </group>
      </group>
    );
  }

  function Washroom3D({ data }) {
    const ultraNear = data.Ultra > 0 && data.Ultra <= 5;
    const humanDetected = data.PIR === 1;
    const fanOn = data.Relay1 === 1 || data.Relay === 1;
    const lightOn = data.Relay2 === 1 || data.Relay === 2;
    const flushOn = data.Relay3 === 1 || data.Relay === 3;
    const sprayOn = data.Relay4 === 1 || data.Relay === 4;

    return (
      <div className="glass-card simulation-card realistic-simulation-card">
        <div className="section-head">
          <div>
            <h3>Smart Washroom 3D View</h3>
          </div>

          <label className={humanDetected ? "danger" : ""}>{humanDetected ? "OCCUPIED" : "EMPTY"}</label>
        </div>

        <div className="canvas-box realistic-canvas-box">
          <Canvas shadows camera={{ position: [8.9, 4.9, 9.5], fov: 30, near: 0.1, far: 100 }}>
            <color attach="background" args={["#f8fcff"]} />

            <ambientLight intensity={0.65} />
            <hemisphereLight intensity={0.75} color="#ffffff" groundColor="#dbeafe" />
            <directionalLight
              castShadow
              position={[3.8, 6.2, 4.8]}
              intensity={1.65}
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-camera-left={-7}
              shadow-camera-right={7}
              shadow-camera-top={7}
              shadow-camera-bottom={-7}
            />
            <spotLight position={[-3.5, 5.2, 3.8]} angle={0.45} penumbra={0.45} intensity={0.8} castShadow />

            <group position={[0, -0.04, 0]} scale={[0.98, 0.98, 0.98]}>
              <FloorTiles />
              <BackWallTiles />
              <SideWalls />
              <CeilingFrame />
              <Door />
              <CeilingLight active={lightOn} />
              <CeilingFan active={fanOn} />
              <BasinArea />
              <ToiletArea />
              <FlushEffect active={flushOn} />
              <SpraySystem active={sprayOn} />
              <WaterTank value={data.Water} />
              <GasCloud value={data.Gas} />
              <HumanModel detected={humanDetected} />
              <SensorBeams pir={data.PIR === 1} ultra={ultraNear} />
              <RoomAccessories pir={data.PIR === 1} ultra={ultraNear} />
            </group>

            <ContactShadows position={[0, 0.018, 0.08]} opacity={0.38} scale={10.8} blur={2.9} far={6} />
            <OrbitControls enableZoom={false} enablePan={false} target={[0, 1.28, -0.82]} maxPolarAngle={Math.PI / 2.08} minPolarAngle={Math.PI / 5.3} />
          </Canvas>
        </div>

        <div className="device-row realistic-device-row">
          <div className={fanOn ? "on" : ""}>🌀 Fan</div>
          <div className={lightOn ? "on" : ""}>💡 Light</div>
          <div className={flushOn ? "on" : ""}>🚽 Flush</div>
          <div className={sprayOn ? "on" : ""}>🚿 Spray</div>
        </div>
      </div>
    );
  }

  /* ======================== MAIN APP ======================== */

  export default function App() {
    const [data, setData] = useState(DEFAULT_DATA);
    const [history, setHistory] = useState([]);
    const [autoMode, setAutoMode] = useState(true);
    const [autoAction, setAutoAction] = useState("Auto mode is ON");
    const [occupancyAlert, setOccupancyAlert] = useState(false);
    const [firebaseError, setFirebaseError] = useState("");

    const [thresholds, setThresholds] = useState({
      gasLow: 200,
      gasHigh: 2500,
      humLow: 30,
      humHigh: 70,
      tempLow: 18,
      tempHigh: 35,
      waterLow: 20,
      waterHigh: 90,
    });

    const dataRef = useRef(DEFAULT_DATA);
    const gasFanBusyRef = useRef(false);
    const gasFanTimerRef = useRef(null);
    const relay3BusyRef = useRef(false);
    const relay4BusyRef = useRef(false);
    const relay3TimerRef = useRef(null);
    const relay4TimerRef = useRef(null);
    const ultraNearRef = useRef(false);
    const humanWasDetectedRef = useRef(false);
    const legacyAutomationDisabled = true;

    useEffect(() => {
      const washroomRef = ref(db, WASHROOM_PATH);

      const unsubscribe = onValue(
        washroomRef,
        (snapshot) => {
          const value = snapshot.val() || {};

          const updated = {
            Gas: toNumber(value.Gas),
            G_LED: toNumber(value.G_LED),
            Hum: toNumber(value.Hum),
            IR: toNumber(value.IR ?? value.ir),
            PIR: toNumber(value.PIR),
            R_LED: toNumber(value.R_LED),
            Relay: toNumber(value.Relay),
            Relay1: toNumber(value.Relay1),
            Relay2: toNumber(value.Relay2),
            Relay3: toNumber(value.Relay3),
            Relay4: toNumber(value.Relay4),
            Temp: toNumber(value.Temp),
            Ultra: toNumber(value.Ultra),
            Water: toNumber(value.Water),
          };

          dataRef.current = updated;
          setData(updated);

          const time = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });

          setHistory((prev) =>
            [
              ...prev,
              {
                time,
                Gas: updated.Gas,
                Hum: updated.Hum,
                Temp: updated.Temp,
                Water: updated.Water,
              },
            ].slice(-35)
          );

          setFirebaseError("");
        },
        (error) => {
          setFirebaseError(error.message);
        }
      );

      return () => unsubscribe();
    }, []);

    async function writeField(key, value) {
      try {
        await set(ref(db, `${WASHROOM_PATH}/${key}`), Number(value));
      } catch (error) {
        console.error(error);
        queueMicrotask(() => setFirebaseError(error.message));
      }
    }

    function queueStatusUpdate(message) {
      queueMicrotask(() => setAutoAction(message));
    }

    function queueOccupancyAlert(value) {
      queueMicrotask(() => setOccupancyAlert(value));
    }

    async function writeRelay(relayNumber, value) {
      await writeField(`Relay${relayNumber}`, value);
    }

    async function writeAllRelaysOff() {
      await Promise.all([1, 2, 3, 4].map((relayNumber) => writeRelay(relayNumber, 0)));
      await writeField("Relay", 0);
    }

    async function runAutoRelay() {}

    useEffect(() => {
      if (legacyAutomationDisabled) return;
      if (!autoMode) return;

      const humanDetected = data.PIR === 1 || data.Ultra === 1;

      if (humanDetected) {
        humanWasDetectedRef.current = true;
      }

      if (data.Gas >= thresholds.gasHigh) {
        runAutoRelay(4, 10000, "Gas high → Spray ON for 10 seconds");
        return;
      }

      if (data.Hum >= thresholds.humHigh || data.Temp >= thresholds.tempHigh) {
        runAutoRelay(1, 10000, "Humidity/Temperature high → Fan ON for 10 seconds");
        return;
      }

      if (humanDetected) {
        runAutoRelay(2, 10000, "PIR/Ultrasonic detected → Light ON for 10 seconds");
        return;
      }

      if (humanWasDetectedRef.current && !humanDetected) {
        humanWasDetectedRef.current = false;
        runAutoRelay(3, 5000, "Human exited → Flush ON for 5 seconds");
      }
    }, [data, autoMode, thresholds]);

    useEffect(() => {
      writeField("G_LED", 1);

      return () => {
        if (gasFanTimerRef.current) clearTimeout(gasFanTimerRef.current);
        if (relay3TimerRef.current) clearTimeout(relay3TimerRef.current);
        if (relay4TimerRef.current) clearTimeout(relay4TimerRef.current);
      };
    }, []);

    useEffect(() => {
      if (!autoMode) return;

      const ultraNear = data.Ultra > 0 && data.Ultra <= 5;

      if (ultraNear && (data.G_LED !== 0 || data.R_LED !== 1)) {
        Promise.all([writeField("G_LED", 0), writeField("R_LED", 1)]);
        queueStatusUpdate("Ultra detected: G_LED OFF and R_LED ON");
      }

      if (ultraNear && !ultraNearRef.current) {
        if (data.R_LED === 1) {
          queueOccupancyAlert(true);
          queueStatusUpdate("Washroom occupied: ultrasonic detected again while R_LED is ON");
        }
      }

      if (!ultraNear) {
        queueOccupancyAlert(false);
      }

      ultraNearRef.current = ultraNear;
    }, [data.G_LED, data.R_LED, data.Ultra, autoMode]);

    useEffect(() => {
      if (!autoMode) return;

      const nextRelay1 = data.PIR === 1 || gasFanBusyRef.current ? 1 : 0;
      if (data.Relay1 !== nextRelay1) {
        writeRelay(1, nextRelay1);
        queueStatusUpdate(`PIR ${data.PIR === 1 ? "detected" : "clear"}: Relay1 ${nextRelay1}`);
      }
    }, [data.PIR, data.Relay1, autoMode]);

    async function startGasFanCycle() {
      if (gasFanBusyRef.current) return;

      gasFanBusyRef.current = true;
      queueStatusUpdate("Gas high: fan Relay1 ON for 10 seconds");
      await writeRelay(1, 1);

      gasFanTimerRef.current = setTimeout(async () => {
        gasFanBusyRef.current = false;

        if (dataRef.current.PIR === 1) {
          queueStatusUpdate("Gas fan cycle finished: PIR still detected, fan stays ON");
          return;
        }

        await writeRelay(1, 0);
        queueStatusUpdate("Gas fan cycle finished: fan Relay1 OFF");

        if (dataRef.current.Gas >= thresholds.gasHigh && autoMode) {
          startGasFanCycle();
        }
      }, 10000);
    }

    useEffect(() => {
      if (!autoMode || data.Gas < thresholds.gasHigh) return;
      if (data.PIR === 1) return;

      startGasFanCycle();
    }, [data.Gas, data.PIR, thresholds.gasHigh, autoMode]);

    useEffect(() => {
      if (!autoMode) return;

      const ultraNear = data.Ultra > 0 && data.Ultra <= 5;
      const sensorDetected = data.PIR === 1 || ultraNear;
      const nextRelay2 = data.Hum >= thresholds.humHigh || sensorDetected ? 1 : 0;
      if (data.Relay2 !== nextRelay2) {
        writeRelay(2, nextRelay2);
        queueStatusUpdate(nextRelay2 ? "Detection/Humidity: Relay2 light ON" : "No detection and humidity normal: Relay2 OFF");
      }
    }, [data.Hum, data.PIR, data.Relay2, data.Ultra, thresholds.humHigh, autoMode]);

    async function startTimedRelay(relayNumber, durationMs, busyRef, timerRef, label) {
      if (busyRef.current) return;

      busyRef.current = true;
      setAutoAction(`IR detected: ${label} ON for ${durationMs / 1000} seconds`);
      await writeRelay(relayNumber, 1);

      timerRef.current = setTimeout(async () => {
        await writeRelay(relayNumber, 0);
        busyRef.current = false;

        if (dataRef.current.IR === 1 && autoMode) {
          startTimedRelay(relayNumber, durationMs, busyRef, timerRef, label);
        } else {
          setAutoAction(`${label} cycle finished`);
        }
      }, durationMs);
    }

    useEffect(() => {
      if (!autoMode || data.IR !== 1) return;

      startTimedRelay(3, 10000, relay3BusyRef, relay3TimerRef, "Relay3");
      startTimedRelay(4, 5000, relay4BusyRef, relay4TimerRef, "Relay4");
    }, [data.IR, autoMode]);

    async function handleModeChange() {
      const nextMode = !autoMode;
      setAutoMode(nextMode);

      if (nextMode) {
        setAutoAction("Auto mode started. Waiting for sensor condition...");
        await writeField("G_LED", 1);
      } else {
        if (gasFanTimerRef.current) clearTimeout(gasFanTimerRef.current);
        if (relay3TimerRef.current) clearTimeout(relay3TimerRef.current);
        if (relay4TimerRef.current) clearTimeout(relay4TimerRef.current);
        gasFanBusyRef.current = false;
        relay3BusyRef.current = false;
        relay4BusyRef.current = false;
        setAutoAction("Manual mode enabled");
        await writeAllRelaysOff();
      }
    }

    const hasUltraReading = data.Ultra > 0;
    const ultraNear = hasUltraReading && data.Ultra <= 5;
    const humanDetected = data.PIR === 1;

    const alerts = useMemo(() => {
      const list = [];

      if (data.Gas >= thresholds.gasHigh) list.push("Gas level is HIGH");
      if (data.Gas <= thresholds.gasLow) list.push("Gas level is LOW");

      if (data.Hum >= thresholds.humHigh) list.push("Humidity is HIGH");
      if (data.Hum <= thresholds.humLow) list.push("Humidity is LOW");

      if (data.Temp >= thresholds.tempHigh) list.push("Temperature is HIGH");
      if (data.Temp <= thresholds.tempLow) list.push("Temperature is LOW");

      if (data.Water >= thresholds.waterHigh) list.push("Water level is HIGH");
      if (data.Water <= thresholds.waterLow) list.push("Water level is LOW");

      if (occupancyAlert) list.push("Washroom occupied");
      if (humanDetected) list.push("Human detected inside washroom");
      if (data.IR === 1) list.push("IR detected: Relay3/Relay4 timed cycle active");
      if (activeRelayNames(data) !== "All OFF") list.push(`${activeRelayNames(data)} active`);

      return list;
    }, [data, thresholds, humanDetected, occupancyAlert]);

    return (
      <div className="app">
        <header className="hero">
          <div>
            <p className="kicker">IoT Based Public Washroom Monitoring</p>
            <h1>Smart Washroom Control Center</h1>
            {/* <p className="hero-text">
              Realtime Firebase dashboard with proper washroom simulation, relay automation,
              fan, light, flush, spray, human detection and alert monitoring.
            </p> */}

            <div className="hero-tags">
              <span>Firebase: /Public_Washroom</span>
              <span>Relays: {activeRelayNames(data)}</span>
              <span>{humanDetected ? "Human Detected" : "Washroom Empty"}</span>
            </div>
          </div>

          <div className="hero-side">
            <div className={`connection-box ${firebaseError ? "error" : ""}`}>
              <span></span>
              <div>
                <h3>{firebaseError ? "Firebase Error" : "Live Connected"}</h3>
                <p>{firebaseError ? "Check Firebase rules/config" : "Realtime Database active"}</p>
              </div>
            </div>

            <div className={`occupancy-box ${humanDetected ? "active" : ""}`}>
              <p>Occupancy</p>
              <h2>{humanDetected ? "Occupied" : "Empty"}</h2>
            </div>
          </div>
        </header>

        {firebaseError && <div className="error-box">Firebase Error: {firebaseError}</div>}

        <main className="main-grid">
          <section className="left-panel">
            <div className="values-grid">
              <ValueCard
                title="Gas"
                value={data.Gas}
                unit="ADC"
                icon="🌫️"
                status={getStatus(data.Gas, thresholds.gasLow, thresholds.gasHigh)}
              />

              <ValueCard
                title="Humidity"
                value={data.Hum}
                unit="%"
                icon="💧"
                status={getStatus(data.Hum, thresholds.humLow, thresholds.humHigh)}
              />

              <ValueCard
                title="Temperature"
                value={data.Temp}
                unit="°C"
                icon="🌡️"
                status={getStatus(data.Temp, thresholds.tempLow, thresholds.tempHigh)}
              />

              <ValueCard
                title="Water"
                value={data.Water}
                unit="%"
                icon="🚰"
                status={getStatus(data.Water, thresholds.waterLow, thresholds.waterHigh)}
              />
            </div>

            <div className="status-grid">
              <StatusCard
                title="PIR Sensor"
                value={data.PIR === 1 ? "Motion detected" : "No motion"}
                active={data.PIR === 1}
                icon="🚶"
              />

              <StatusCard
                title="Ultrasonic"
                value={!hasUltraReading ? "No reading" : ultraNear ? `Near (${data.Ultra})` : `Clear (${data.Ultra})`}
                active={ultraNear}
                icon="📡"
              />

              <StatusCard
                title="Human Status"
                value={humanDetected ? "Person inside" : "Washroom empty"}
                active={humanDetected}
                icon="👤"
              />

              <StatusCard
                title="Relay Status"
                value={activeRelayNames(data)}
                active={activeRelayNames(data) !== "All OFF"}
                icon="⚡"
              />
            </div>

            <div className="glass-card control-card">
              <div className="section-head">
                <div>
                  <h3>Manual / Auto Control</h3>
                  <p>Relay1 fan, Relay2 light, Relay3 flush, Relay4 spray</p>
                </div>

                <button
                  className={`mode-btn ${autoMode ? "auto" : ""}`}
                  onClick={handleModeChange}
                >
                  {autoMode ? "AUTO MODE ON" : "MANUAL MODE ON"}
                </button>
              </div>

              <div className="relay-grid">
                <button disabled={autoMode} onClick={() => writeRelay(1, 1)}>
                  <span>🌀</span>
                  <b>Fan ON</b>
                  <small>Relay1=1</small>
                </button>

                <button disabled={autoMode} onClick={() => writeRelay(2, 1)}>
                  <span>💡</span>
                  <b>Light ON</b>
                  <small>Relay2=1</small>
                </button>

                <button disabled={autoMode} onClick={() => writeRelay(3, 1)}>
                  <span>🚽</span>
                  <b>Flush ON</b>
                  <small>Relay3=1</small>
                </button>

                <button disabled={autoMode} onClick={() => writeRelay(4, 1)}>
                  <span>🚿</span>
                  <b>Spray ON</b>
                  <small>Relay4=1</small>
                </button>

                <button className="off" onClick={writeAllRelaysOff}>
                  <span>⛔</span>
                  <b>All OFF</b>
                  <small>Relay1-4=0</small>
                </button>
              </div>

              <div className="auto-action">
                <b>Auto Action</b>
                <p>{autoAction}</p>
              </div>
            </div>

            <div className="graphs-grid">
              <GraphCard title="Gas Graph" data={history} dataKey="Gas" unit="ADC" />
              <GraphCard title="Humidity Graph" data={history} dataKey="Hum" unit="%" />
              <GraphCard title="Temperature Graph" data={history} dataKey="Temp" unit="°C" />
              <GraphCard title="Water Graph" data={history} dataKey="Water" unit="%" />
            </div>
          </section>

          <section className="right-panel">
            <Washroom3D data={data} />

            <div className="glass-card alert-card">
              <div className="section-head">
                <div>
                  <h3>Alert Center</h3>
                  <p>High and low safety alerts</p>
                </div>
                <label className={alerts.length > 0 ? "danger" : ""}>{alerts.length}</label>
              </div>

              {alerts.length === 0 ? (
                <div className="ok-message">All values are normal. No alert detected.</div>
              ) : (
                <div className="alert-list">
                  {alerts.map((alert, index) => (
                    <div className="alert-row" key={index}>
                      <b>⚠</b>
                      <span>{alert}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="glass-card threshold-card">
              <div className="section-head">
                <div>
                  <h3>Threshold Settings</h3>
                  <p>Change alert limits</p>
                </div>
              </div>

              <div className="threshold-grid">
                {[
                  ["Gas Low", "gasLow"],
                  ["Gas High", "gasHigh"],
                  ["Hum Low", "humLow"],
                  ["Hum High", "humHigh"],
                  ["Temp Low", "tempLow"],
                  ["Temp High", "tempHigh"],
                  ["Water Low", "waterLow"],
                  ["Water High", "waterHigh"],
                ].map(([label, key]) => (
                  <label key={key}>
                    {label}
                    <input
                      type="number"
                      value={thresholds[key]}
                      onChange={(e) =>
                        setThresholds({
                          ...thresholds,
                          [key]: Number(e.target.value),
                        })
                      }
                    />
                  </label>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
