
const $ = id => document.getElementById(id);
const LS = {
  trips:"manatil_simple_trips",
  items:"manatil_simple_items",
  origins:"manatil_simple_origins",
  destinations:"manatil_simple_destinations",
  fleets:"manatil_simple_fleets",
  config:"manatil_simple_config",
  lot:"manatil_simple_current_lot"
};
let currentScanStream = null;

function load(k,f){ try{return JSON.parse(localStorage.getItem(k)) ?? f}catch(e){return f} }
function save(k,v){ localStorage.setItem(k, JSON.stringify(v)); }
function now(){ return new Date().toISOString(); }
function fmt(dt){ try{return new Date(dt).toLocaleString()}catch(e){return dt} }
function ymd(){ const d=new Date(); return d.getFullYear()+String(d.getMonth()+1).padStart(2,"0")+String(d.getDate()).padStart(2,"0"); }

function seed(){
  if(!localStorage.getItem(LS.origins)) save(LS.origins,["Ajax", "All Power", "Arenal Grande", "Asencio", "ATM", "ATM - Transito", "Av Italia", "Ayax Carrasco", "Ayax Central", "Ayax Punta", "Boenal", "Bonport", "Bord", "Boulevar", "Carone", "Casa Nissan", "Cerro Largo", "Chacomer", "Colonia", "Convención", "Despacho Uy", "Directo - ATM", "Elias Regales", "Eurocar Aeropuerto", "Expedicion Py", "Fabemix", "Fac Agronomia", "Felitour", "Fiancar", "Forum", "Galicia", "Grupo trans", "Homero Leon", "Juncal", "Lopez Motors Uruguay", "Mabrisol", "Mayabel", "Minas", "Mitsubishi", "Montecom", "Multicar", "Nordex", "Oceano FM.", "Orejano", "Pideno", "Pisano", "Pocitos", "Polo Ayax", "Polo Oeste", "Punta Sayago", "RAS", "Ruta 1", "Santa Rosa", "Taller Av Italia", "Taller Cano", "Taller Car One", "Taller Galicia", "Taller Gti", "Taller Nissan", "Taller Renault", "Taller Tg Ride", "Taminer", "TMM", "Top Van"]);
  if(!localStorage.getItem(LS.destinations)) save(LS.destinations,["Ajax", "All Power", "Arenal Grande", "Asencio", "ATM", "ATM - Transito", "Av Italia", "Ayax Carrasco", "Ayax Central", "Ayax Punta", "Boenal", "Bonport", "Bord", "Boulevar", "Carone", "Casa Nissan", "Cerro Largo", "Chacomer", "Colonia", "Convención", "Despacho Uy", "Directo - ATM", "Elias Regales", "Eurocar Aeropuerto", "Expedicion Py", "Fabemix", "Fac Agronomia", "Felitour", "Fiancar", "Forum", "Galicia", "Grupo trans", "Homero Leon", "Juncal", "Lopez Motors Uruguay", "Mabrisol", "Mayabel", "Minas", "Mitsubishi", "Montecom", "Multicar", "Nordex", "Oceano FM.", "Orejano", "Pideno", "Pisano", "Pocitos", "Polo Ayax", "Polo Oeste", "Punta Sayago", "RAS", "Ruta 1", "Santa Rosa", "Taller Av Italia", "Taller Cano", "Taller Car One", "Taller Galicia", "Taller Gti", "Taller Nissan", "Taller Renault", "Taller Tg Ride", "Taminer", "TMM", "Top Van"]);
  if(!localStorage.getItem(LS.fleets)) save(LS.fleets,["M303", "M116", "FREDY", "M109", "MURCH", "M106", "M107", "M108", "M112", "M113", "M114", "M115", "M110", "M301", "M202", "M102", "M203", "M304", "M103", "M302", "M105", "M104", "STP695", "M201"]);
  if(!localStorage.getItem(LS.trips)) save(LS.trips,[]);
  if(!localStorage.getItem(LS.items)) save(LS.items,[]);
  if(!localStorage.getItem(LS.config)) save(LS.config,{phone:"",email:"",syncUrl:""});
}
seed();



function applyAppVersionUpdate(){
  const cfg = load(LS.config,{});
  const appVersion = "MANATIL v1.4 - Patios archivo actualizado";
  if(cfg.appVersion !== appVersion){
    save(LS.origins, ["Ajax", "All Power", "Arenal Grande", "Asencio", "ATM", "ATM - Transito", "Av Italia", "Ayax Carrasco", "Ayax Central", "Ayax Punta", "Boenal", "Bonport", "Bord", "Boulevar", "Carone", "Casa Nissan", "Cerro Largo", "Chacomer", "Colonia", "Convención", "Despacho Uy", "Directo - ATM", "Elias Regales", "Eurocar Aeropuerto", "Expedicion Py", "Fabemix", "Fac Agronomia", "Felitour", "Fiancar", "Forum", "Galicia", "Grupo trans", "Homero Leon", "Juncal", "Lopez Motors Uruguay", "Mabrisol", "Mayabel", "Minas", "Mitsubishi", "Montecom", "Multicar", "Nordex", "Oceano FM.", "Orejano", "Pideno", "Pisano", "Pocitos", "Polo Ayax", "Polo Oeste", "Punta Sayago", "RAS", "Ruta 1", "Santa Rosa", "Taller Av Italia", "Taller Cano", "Taller Car One", "Taller Galicia", "Taller Gti", "Taller Nissan", "Taller Renault", "Taller Tg Ride", "Taminer", "TMM", "Top Van"]);
    save(LS.destinations, ["Ajax", "All Power", "Arenal Grande", "Asencio", "ATM", "ATM - Transito", "Av Italia", "Ayax Carrasco", "Ayax Central", "Ayax Punta", "Boenal", "Bonport", "Bord", "Boulevar", "Carone", "Casa Nissan", "Cerro Largo", "Chacomer", "Colonia", "Convención", "Despacho Uy", "Directo - ATM", "Elias Regales", "Eurocar Aeropuerto", "Expedicion Py", "Fabemix", "Fac Agronomia", "Felitour", "Fiancar", "Forum", "Galicia", "Grupo trans", "Homero Leon", "Juncal", "Lopez Motors Uruguay", "Mabrisol", "Mayabel", "Minas", "Mitsubishi", "Montecom", "Multicar", "Nordex", "Oceano FM.", "Orejano", "Pideno", "Pisano", "Pocitos", "Polo Ayax", "Polo Oeste", "Punta Sayago", "RAS", "Ruta 1", "Santa Rosa", "Taller Av Italia", "Taller Cano", "Taller Car One", "Taller Galicia", "Taller Gti", "Taller Nissan", "Taller Renault", "Taller Tg Ride", "Taminer", "TMM", "Top Van"]);
    cfg.appVersion = appVersion;
    save(LS.config, cfg);
  }
}



applyAppVersionUpdate();

function show(tab){
  document.querySelectorAll("section").forEach(s=>s.classList.add("hidden"));
  $(tab).classList.remove("hidden");
  document.querySelectorAll("nav button").forEach(b=>b.classList.remove("active"));
  $("btn-"+tab).classList.add("active");
  stopScanner();
  if(tab==="trip") initTrip();
  if(tab==="reports") renderReports();
  if(tab==="admin") renderAdmin();
}

function fillSelect(id, arr){
  const el=$(id); if(!el) return; el.innerHTML="";
  arr.forEach(v=>{ const o=document.createElement("option"); o.value=v; o.textContent=v; el.appendChild(o); });
}

function nextTripId(){
  const prefix = "VIAJE-" + ymd() + "-";
  let max=0;
  load(LS.trips,[]).forEach(t=>{
    const id=t?.id || "";
    if(id.startsWith(prefix)){
      const n=parseInt(id.slice(prefix.length),10);
      if(!isNaN(n)&&n>max) max=n;
    }
  });
  return prefix + String(max+1).padStart(3,"0");
}

function getLot(){
  let lot=load(LS.lot,null);
  if(!lot){
    lot={vins:[],fleet:"",origin:"",destination:"",createdAt:now(),lat:"",lng:""};
    save(LS.lot,lot);
  }
  return lot;
}

function saveLotFromForm(){
  let lot=getLot();
  lot.fleet=$("tripFleet").value;
  lot.origin=$("origin").value;
  lot.destination=$("destination").value;
  lot.lat=$("lat").value;
  lot.lng=$("lng").value;
  save(LS.lot,lot);
}

function initTrip(){
  fillSelect("tripFleet", load(LS.fleets,[]));
  fillSelect("origin", load(LS.origins,[]));
  fillSelect("destination", load(LS.destinations,[]));

  const lot=getLot();
  $("nextTripId").value=nextTripId();
  if(lot.fleet) $("tripFleet").value=lot.fleet;
  if(lot.origin) $("origin").value=lot.origin;
  if(lot.destination) $("destination").value=lot.destination;
  $("datetime").value=fmt(now());
  $("lat").value=lot.lat||"";
  $("lng").value=lot.lng||"";
  renderLot();
  if(!lot.lat||!lot.lng) getGps();
}

function getGps(){
  $("gpsStatus").textContent="Buscando GPS...";
  if(!navigator.geolocation){ $("gpsStatus").textContent="GPS no disponible"; return; }
  navigator.geolocation.getCurrentPosition(pos=>{
    $("lat").value=pos.coords.latitude.toFixed(6);
    $("lng").value=pos.coords.longitude.toFixed(6);
    saveLotFromForm();
    $("gpsStatus").textContent=`GPS OK ±${Math.round(pos.coords.accuracy)} m`;
  }, err=>{
    $("gpsStatus").textContent="No se pudo obtener GPS: "+err.message;
  }, {enableHighAccuracy:true,timeout:12000,maximumAge:0});
}

function vinChanged(){
  const vin=$("vin").value.trim().toUpperCase();
  $("vehicleInfo").innerHTML = vin ? `<span class="ok">VIN listo para agregar.</span>` : "";
}

async function startScanner(){
  $("scannerBox").classList.remove("hidden");
  const video=$("video");
  try{
    currentScanStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}});
    video.srcObject=currentScanStream;
    await video.play();
    if("BarcodeDetector" in window){
      const detector=new BarcodeDetector({formats:["qr_code","code_128","code_39","code_93","codabar","ean_13","ean_8","upc_a","upc_e","itf"]});
      const loop=async()=>{
        if(!currentScanStream) return;
        try{
          const codes=await detector.detect(video);
          if(codes.length){
            $("vin").value=codes[0].rawValue;
            vinChanged();
            addVin();
            stopScanner();
            return;
          }
        }catch(e){}
        requestAnimationFrame(loop);
      };
      loop();
    } else {
      $("scanHelp").textContent="Este navegador no soporta lector automatico. Ingresar VIN manualmente.";
    }
  }catch(e){
    $("scanHelp").textContent="No se pudo abrir camara: "+e.message;
  }
}

function stopScanner(){
  if(currentScanStream){
    currentScanStream.getTracks().forEach(t=>t.stop());
    currentScanStream=null;
  }
  if($("scannerBox")) $("scannerBox").classList.add("hidden");
}

function addVin(){
  saveLotFromForm();
  const vin=$("vin").value.trim().toUpperCase();
  if(!vin){ alert("Ingresar VIN."); return; }
  let lot=getLot();
  if(lot.vins.some(x=>x.vin===vin)){
    alert("Ese VIN ya esta cargado en este viaje.");
    return;
  }
  lot.vins.push({vin});
  save(LS.lot,lot);
  $("vin").value="";
  $("vehicleInfo").innerHTML="";
  renderLot();
}

function removeVin(vin){
  let lot=getLot();
  lot.vins=lot.vins.filter(x=>x.vin!==vin);
  save(LS.lot,lot);
  renderLot();
}

function renderLot(){
  const lot=getLot();
  $("lotCount").textContent=lot.vins.length;
  const box=$("lotVins");
  box.innerHTML="";
  lot.vins.forEach(i=>{
    const div=document.createElement("div");
    div.className="list-item";
    div.innerHTML=`<b>${i.vin}</b><button class="btn danger" style="padding:8px" onclick='removeVin(${JSON.stringify(i.vin)})'>Quitar</button>`;
    box.appendChild(div);
  });
}

function clearCurrentLot(){
  if(!confirm("¿Limpiar VIN cargados antes de guardar?")) return;
  save(LS.lot,{vins:[],fleet:"",origin:"",destination:"",createdAt:now(),lat:"",lng:""});
  $("notes").value="";
  $("vin").value="";
  initTrip();
}

function saveTrip(){
  saveLotFromForm();
  const lot=getLot();
  if(!lot.fleet || !lot.origin || !lot.destination){
    alert("Completar flota, origen y destino.");
    return;
  }
  if(!lot.vins.length){
    alert("Agregar al menos un VIN.");
    return;
  }

  const tripId = nextTripId();
  const trip={
    id:tripId,
    date:now(),
    fleet:lot.fleet,
    origin:lot.origin,
    destination:lot.destination,
    lat:lot.lat,
    lng:lot.lng,
    notes:$("notes").value.trim(),
    total:lot.vins.length,
    visible:true,
    synced:false,
    syncError:""
  };

  const trips=load(LS.trips,[]);
  trips.unshift(trip);
  save(LS.trips,trips);

  const items=load(LS.items,[]);
  lot.vins.forEach((v,idx)=>{
    items.unshift({tripId:trip.id,order:idx+1,vin:v.vin});
  });
  save(LS.items,items);

  save(LS.lot,{vins:[],fleet:lot.fleet,origin:lot.origin,destination:lot.destination,createdAt:now(),lat:"",lng:""});
  $("notes").value="";
  autoSendTrip(trip.id);
  alert("Viaje guardado: "+trip.id);
  initTrip();
}

function tripItems(id){
  return load(LS.items,[]).filter(i=>i.tripId===id).sort((a,b)=>(a.order||0)-(b.order||0));
}

function visibleTrips(){
  return load(LS.trips,[]).filter(t=>t.visible!==false);
}

function renderReports(){
  const trips=load(LS.trips,[]);
  const vis=visibleTrips();
  $("totalTrips").textContent=trips.length;
  $("visibleTrips").textContent=vis.length;
  $("totalUnits").textContent=vis.reduce((a,t)=>a+(t.total||tripItems(t.id).length),0);

  const tbody=$("tripsTable");
  tbody.innerHTML="";
  vis.slice(0,200).forEach(t=>{
    const tr=document.createElement("tr");
    tr.innerHTML=`<td><b>${t.id}</b><br>${fmt(t.date)}<br><span class="small">${t.synced ? "Enviado API" : "Pendiente API"}</span></td><td><b>Flota: ${t.fleet}</b><br>${t.origin} → ${t.destination}<br>${t.total} VIN</td><td><span class="small">${t.lat&&t.lng?t.lat+","+t.lng:"Sin GPS"}</span></td><td><button class="btn secondary" style="padding:8px;margin:0" onclick='sendTripWhatsApp(${JSON.stringify(t.id)})'>WhatsApp</button><button class="btn light" style="padding:8px;margin-top:6px" onclick='shareTripTxt(${JSON.stringify(t.id)})'>TXT</button></td>`;
    tbody.appendChild(tr);
  });
}

function clearVisibleTrips(){
  if(!confirm("Esto limpia los viajes visibles, pero conserva el historico para exportar/backup. ¿Continuar?")) return;
  const trips=load(LS.trips,[]).map(t=>({...t,visible:false}));
  save(LS.trips,trips);
  renderReports();
}

function restoreVisibleTrips(){
  const trips=load(LS.trips,[]).map(t=>({...t,visible:true}));
  save(LS.trips,trips);
  renderReports();
}

function csvEsc(v){ return `"${String(v??"").replaceAll('"','""')}"`; }



function download(name,content,type="text/plain"){
  const blob=new Blob([content],{type});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  a.href=url;
  a.download=name;
  a.click();
  URL.revokeObjectURL(url);
}



function buildText(id){
  const t=load(LS.trips,[]).find(x=>x.id===id);
  if(!t) return "Viaje no encontrado";
  const items=tripItems(id);
  let txt="🚚 VIAJE MANATIL\n\n";
  txt+=`N° Viaje: ${t.id}\nFecha: ${fmt(t.date)}\nFlota: ${t.fleet}\nOrigen: ${t.origin}\nDestino: ${t.destination}\n`;
  if(t.lat&&t.lng) txt+=`GPS origen: https://maps.google.com/?q=${t.lat},${t.lng}\n`;
  txt+=`\nUnidades (${items.length}):\n`;
  items.forEach((i,n)=>txt+=`${n+1}. VIN: ${i.vin}\n`);
  if(t.notes) txt+=`\nObservaciones: ${t.notes}\n`;
  return txt;
}

function sendTripWhatsApp(id){
  const phone=(load(LS.config,{}).phone||"").replace(/\D/g,"");
  const base=phone?`https://wa.me/${phone}?text=`:"https://wa.me/?text=";
  window.open(base+encodeURIComponent(buildText(id)),"_blank");
}

function sendLastWhatsApp(){
  const t=visibleTrips()[0];
  if(!t){ alert("No hay viajes visibles."); return; }
  sendTripWhatsApp(t.id);
}

function renderAdmin(){
  const cfg=load(LS.config,{});
  $("phone").value=cfg.phone||"";
  $("email").value=cfg.email||"";
  if($("syncUrl")) $("syncUrl").value=cfg.syncUrl||"";
  renderList("fleetsList",LS.fleets);
  renderList("originList",LS.origins);
  renderList("destinationList",LS.destinations);
}

function saveConfig(){
  const cfg=load(LS.config,{});
  cfg.phone=$("phone").value.trim();
  cfg.email=$("email").value.trim();
  if($("syncUrl")) cfg.syncUrl=$("syncUrl").value.trim();
  save(LS.config,cfg);
  alert("Configuracion guardada.");
}

function addListItem(key,inputId){
  const val=$(inputId).value.trim();
  if(!val) return;
  const arr=load(key,[]);
  if(!arr.includes(val)) arr.push(val);
  save(key,arr);
  $(inputId).value="";
  renderAdmin();
}

function removeListItem(key,val){
  if(!confirm("¿Borrar valor?")) return;
  save(key,load(key,[]).filter(x=>x!==val));
  renderAdmin();
}

function renderList(id,key){
  const box=$(id);
  box.innerHTML="";
  load(key,[]).forEach(v=>{
    const d=document.createElement("div");
    d.className="list-item actions";
    d.innerHTML=`<span>${v}</span><button class="btn danger" style="margin:0;padding:8px" onclick='removeListItem("${key}",${JSON.stringify(v)})'>Borrar</button>`;
    box.appendChild(d);
  });
}








async function autoSendTrip(tripId){
  const cfg = load(LS.config,{});
  const url = (cfg.syncUrl || "").trim();
  if(!url) return;

  const trips = load(LS.trips,[]);
  const trip = trips.find(t => t.id === tripId);
  if(!trip) return;

  const payload = {
    trip: trip,
    items: tripItems(tripId)
  };

  try{
    await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(payload)
    });

    trip.synced = true;
    trip.syncError = "";
    save(LS.trips, trips);
  }catch(e){
    trip.synced = false;
    trip.syncError = e.message || "Error de envio";
    save(LS.trips, trips);
  }
}




function codeValue(value){
  return String(value || "")
    .trim()
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "");
}

function buildTxtFileContent(tripId){
  const trips = load(LS.trips, []);
  const t = trips.find(x => x.id === tripId);
  if(!t) return "";

  const origin = codeValue(t.origin);
  const destination = codeValue(t.destination);
  const items = tripItems(tripId);

  return items.map(i => {
    const vin = String(i.vin || "").trim().toUpperCase();
    return `${vin};99;;;;${origin};URUGUAY;;;${destination}`;
  }).join("\n");
}

function downloadTripTxt(tripId){
  const content = buildTxtFileContent(tripId);
  if(!content){
    alert("No hay datos para generar el archivo.");
    return;
  }
  const name = `${tripId}.txt`;
  download(name, content, "text/plain;charset=utf-8");
}

async function shareTripTxt(tripId){
  const content = buildTxtFileContent(tripId);
  if(!content){
    alert("No hay datos para compartir.");
    return;
  }

  const file = new File([content], `${tripId}.txt`, {type:"text/plain"});
  if(navigator.canShare && navigator.canShare({files:[file]})){
    try{
      await navigator.share({
        title: "Archivo viaje MANATIL",
        text: `Archivo del viaje ${tripId}`,
        files: [file]
      });
      return;
    }catch(e){}
  }

  downloadTripTxt(tripId);
  alert("Tu navegador no permite adjuntar automáticamente. Se descargó el TXT para enviarlo por WhatsApp.");
}

function shareLastTripTxt(){
  const t = visibleTrips()[0];
  if(!t){
    alert("No hay viajes visibles.");
    return;
  }
  shareTripTxt(t.id);
}




function showAppVersion(){
  const el = document.getElementById("appVersion");
  if(el) el.textContent = "MANATIL v1.4 - Patios archivo actualizado";
}



if("serviceWorker" in navigator){
  navigator.serviceWorker.register("./sw.js").catch(()=>{});
}

window.addEventListener("load",()=>{
  applyAppVersionUpdate(); show("trip"); showAppVersion();
  $("vin").addEventListener("input",vinChanged);
  ["tripFleet","origin","destination"].forEach(id=>$(id).addEventListener("change",saveLotFromForm));
});
