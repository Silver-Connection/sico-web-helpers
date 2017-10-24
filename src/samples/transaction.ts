function notifyInfo() {
    sico.Transaction.$notifyNow("Info", 0, "Some informations...");
}

function notifySuccess() {
    sico.Transaction.$notifyNow("Success", 1, "All done!");
}

function notifyError() {
    sico.Transaction.$notifyNow("Error", 2, "Ohn...we have erros");
}
