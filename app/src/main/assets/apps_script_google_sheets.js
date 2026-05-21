function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Viajes");

  if (!sheet) {
    sheet = ss.insertSheet("Viajes");
    sheet.appendRow([
      "Fecha Recepcion",
      "ID Viaje",
      "Fecha Viaje",
      "Flota",
      "Origen",
      "Destino",
      "Lat",
      "Lng",
      "Orden",
      "VIN",
      "Observaciones"
    ]);
  }

  const data = JSON.parse(e.postData.contents);
  const trip = data.trip;
  const items = data.items || [];

  items.forEach(item => {
    sheet.appendRow([
      new Date(),
      trip.id,
      trip.date,
      trip.fleet,
      trip.origin,
      trip.destination,
      trip.lat,
      trip.lng,
      item.order,
      item.vin,
      trip.notes || ""
    ]);
  });

  return ContentService
    .createTextOutput(JSON.stringify({status: "ok"}))
    .setMimeType(ContentService.MimeType.JSON);
}
