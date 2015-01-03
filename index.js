// Without fromPromise
var urlStream                = Rx.Observable.just("https://api.github.com/users"),
    urlStreamToRequestStream = function(urlStream) {
      return urlStream.flatMap(function(url) {
        return Rx.Observable.create(function (observer) {
          jQuery.getJSON(url)
          .done(function(response) { observer.onNext(response); })
          .fail(function(jqXHR, status, error) { observer.onError(error); })
          .always(function() { observer.onCompleted(); });
        });
      });
    },
    requestStream = urlStreamToRequestStream(urlStream);

requestStream.forEach(function(response) {
  console.log(response);
});

// With fromPromise
var urlStream                = Rx.Observable.just("https://api.github.com/users"),
    urlStreamToRequestStream = function(urlStream) {
      return urlStream.flatMap(function(url) {
        return Rx.Observable.fromPromise(jQuery.getJSON(url));
      });
    },
    requestStream = urlStreamToRequestStream(urlStream);

requestStream.forEach(function(response) {
  console.log(response);
});
