    /**
    * k means algorithm
    * @param data
    * @param k
    * @return {Object}
    */
    var dataset, count = 0;
   
    function kmeans(data, k) {
    	dataset = data;

    	var dim = Object.keys(data[0]);
        
        //ta ut 2 random punkter ur datasetet
        var centroids = [],
        centroids = getCentroids(data,k);
        
        //gå igenom alla punkter i datasetet och räkna ut avståndet till närmsta centerpunkt

        //euclidian distance
        
        var meanList = [];
        var prev_qual = [0, 0, 0, 0, 0, 0, 0];
        var counter = 0;
    
        var meanValues = [];

        do{
        	var list = ["-6"];

        	console.log("centroids: "  + centroids);
        	 

        	 for(var i = 1; i < data.length; i++){

        	 	var centroidIndex = euclidianDistance(data[i], centroids, dim);
        	 	list.push(centroidIndex);
        	 	
			}

	        //beräkna medelvärdet för att sätta ut ny mittpunkt.
			for(var j = 0; j < k; j++){
				meanValues[j] = calculateMeanValue(j, list, dim);

			}

	        //för att beräkna kvalitén, gör en do/while loop som beräknar skillnaden mellan det
	        //nuvarande och den tidigare kvalitén. Ska vara så nära 0 som möjligt. När det inte
	        //sker någon förändring av värdet längre är det så bra kvalitét som möjligt och loopen 
	        //kan stoppas.

	        var qualityArray = [];

	        for(var i = 0; i < centroids.length; i++){
	        	 qualityArray[i] = currentQuality(i, dim, list, meanValues);
	        	
	        }

	        //är kvalitén bättre?
	        var resultingQuality = [];
	        for(var i = 0; i < centroids.length; i++){
	        	resultingQuality[i] = Math.abs(prev_qual[i] - qualityArray[i]);
	        	prev_qual[i] = qualityArray[i];
	        	centroids[i] = meanValues[i];

	        }

	        counter++;

	   /*     var isDone0 = false, isDone1 = false;
	        if(currentQuality_0 < 0.001) isDone0 = true;
	        if(currentQuality_1 < 0.001) isDone1 = true;*/
	               console.log("resulting quality" + resultingQuality);


    } while(counter < 10);



         //returnera en array som innehåller 0 eller 1 beroende på vilken position
         return list;
    };

    function getCentroids(data,size){
		var centroids = [];
    	for(var i = 0; i < size; i++){
    		centroids.push(data[Math.floor(Math.random() * data.length)]);
        }
        return centroids;
    }

    function euclidianDistance(currentData, centroids, dim){
    	var distances = [];
    	var current = 0;


    	for(var j = 0; j < centroids.length; j++){
    		for(var i = 0; i < dim.length; i++){
	    		current =+ Math.pow((currentData[dim[i]] - centroids[j][dim[i]]), 2);
    		}
    		distances.push(Math.sqrt(current));
    	}

    	var min = d3.min(distances);
    	var index = distances.indexOf(min);
    	
    	
    	return index;
    }

    function calculateMeanValue(currentCentroid, list, dim){
    	var a = 0, b = 0, c = 0, d = 0, e = 0;
    	var counter = 0, check = 0;

    	for(var i = 0; i < dataset.length; i++){
    		if(list[i] == currentCentroid){
    			a =+ parseFloat(dataset[i].A);
    			b =+ parseFloat(dataset[i].B);
    			c =+ parseFloat(dataset[i].C);
    			if(dim.length > 3){
    				d =+ parseFloat(dataset[i].D);
    				e =+ parseFloat(dataset[i].E);
    			}
    		counter++;	
    		}
    		else check++;
    	}

    	//om den aldrig går in i första if-satsen(ej innehåller rätt index)
    	if(check != 400 && dim.length < 3){
    		a = a/counter;
	    	b = b/counter;
	    	c = c/counter;
	    	d = d/counter;
	    	e = e/counter;
    	}
    	else if(check != 5600 && dim.length > 2){
    		a = a/counter;
	    	b = b/counter;
	    	c = c/counter;
	    	d = d/counter;
	    	e = e/counter;
    	}
    	else count++;
    	
    	var returnObject = {A:"", B:"", C:""};
    	

    	//console.log("me: " + dataset.length);
    	if( dim.length > 3){
    		returnObject.A = a.toString();
			returnObject.B = b.toString();
			returnObject.C = c.toString();
			returnObject.D = d.toString();
			returnObject.E = e.toString();
    	} 
		else{
			returnObject.A = a.toString();
			returnObject.B = b.toString();
			returnObject.C = c.toString();

		}
		return returnObject;

    }

    function currentQuality(currentCentroid, dim, list, meanValues){
    	var quality = 0;

    	for(var j = 0; j <= list.length; j++){
    		if(list[j] == currentCentroid){
    			for(var i = 0; i < dim.length; i++){
	    		quality =+ Math.pow((parseFloat(dataset[j][dim[i]]) - meanValues[currentCentroid][dim[i]]), 2);
	    		//console.log("medel: " + meanValues[currentCentroid][i]);
    			}
    			quality = Math.sqrt(quality);
    		}
       	}
    	
    	return quality;
    }
    
    