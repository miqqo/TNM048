/**
* k means algorithm
* @param data
* @param k
* @return {Object}
*/
var centroids = [], keys = [];

function kmeans(data, k) {

    var dim = Object.keys(data[0]);
    console.log(dim);
    //var dim = Object.keys(data[0]);
    keys = d3.keys(data[0]);

    var indexArr = new Array(data.length);

    // calculate random values
   for (var i = 0; i < k; i++) {
       centroids.push(getRandomCentroid(dim, data));      
   };



    console.log(centroids)
   // console.log(centroids2)

    var centroidData = [];

    var threshold = 0.1;
    var minError = 0;
    var newQualityChecker = 10000;
    var counter = 0;

   do{

        centroidData = [];

        for (var i = 0; i < k; i++)
            centroidData.push([]);
        
        //Which dot that represents which centroid
        for (var i = 0; i < data.length; i++) {
            indexArr[i] = calculateCentroidDistances(data[i], dim);
            centroidData[indexArr[i]].push(data[i], dim);
            // centroidData[indexArr[i]] = (data[i]);
        };
        
        //Make the new centroids
        centroids = [];
        for (var i = 0; i < k; i++) {
            centroids[i] = calculateNewCentroid(centroidData[i],dim);
        };
        
        //Calculate the quality value and look the diffrence beetween prev and current
        var prevQuality = newQualityChecker;
        newQualityChecker = qualityChecker(centroidData, dim);           
        minError = newQualityChecker/prevQuality;
        
        counter++;

    }while(minError > threshold)

    // console.log("Iterations: " + counter);
    // console.log(indexArr)
    return indexArr;
}


function calculateNewCentroid(centroidData, dim){
    var array = [], resultingArray = [];

    for (var i = 0; i < centroidData.length; i++) {
        for(var j = 0; j < dim.length; j++){
            array[j] += centroidData[i][dim[j]];
        }
    };

    for(var i = 0; i < dim.length; i++){
        resultingArray[i] = array[i]/centroidData.length;
    }

    return resultingArray;
}



function calculateCentroidDistances(data, dim){
    var distances = [], a = 0;
    for (var i = 0; i < centroids.length; i++) {
        a = 0;
       /*  keys.forEach(function(p){
            a += Math.pow((parseFloat(data[p]) - centroids[i][dim[]]), 2);

         })*/

        for(var j = 0; j < dim.length; j++){
            a += Math.pow((parseFloat(data[dim[j]]) - centroids[i][j]), 2);
        }

        distances.push(Math.sqrt(a));

     }; 
     var min = d3.min(distances);
     var index = distances.indexOf(min);

     return index;
}

function qualityChecker(centroidData, dim){

    var sum = 0;
    for(var i = 0; i < centroids.length; i++){
        for (var j = 0; j < centroidData[i].length; j++) {
            for(var k = 0; k < dim.length; k++){
                sum += Math.pow((centroidData[i][j][k] - centroids[i][k]), 2);
            }
             /*sum += (Math.pow(centroidData[i][j].A - centroids[i][0], 2) +
             Math.pow(centroidData[i][j].B - centroids[i][1], 2) +
             Math.pow(centroidData[i][j].C - centroids[i][2], 2))*/
        }
    }
    return Math.sqrt(sum);
}


function getRandomCentroid(dim, data){
// function getRandomCentroid(dim, data){
    var a = [];
    var obj = data[Math.floor(Math.random() * data.length)];

    for (var i = 0; i < dim.length; i++) {
        a.push(Number(obj[keys[i]]));
    };
    return a;
}