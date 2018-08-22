//total files to be precached
var totalFiles = precacheConfig.length;
console.log('total files', totalFiles);
//files already precached
var processedFiles = 0;
//Original cleanResponse function from service-worker
var originalCleanResponseFunc = cleanResponse;

var cleanResponse = function(originalResponse) {
  processedFiles++;
  var percentage = parseInt((processedFiles / totalFiles) * 100);
  console.log('Percentage', percentage);
  self.clients
    .matchAll({
      includeUncontrolled: true,
      type: 'window',
    })
    .then(function(clients) {
      clients.forEach(function(client) {
        client.postMessage({
          percentage: percentage,
          done: processedFiles === totalFiles,
        });
      });
    });
  //finally call the original cleanResponseFunc
  return originalCleanResponseFunc(originalResponse);
};
