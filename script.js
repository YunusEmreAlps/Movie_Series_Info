// Vue
var app = new Vue({
    el:"#app",
    data:{
        // string, boolean
        movies:[],
        index:-1,
        control:false,
        nfound:false

    },
    methods : {   
        search(e){
            for(var i=0; i<this.movies.length; i++)
            {
                this.control=false;
                this.nfound=false;
                if(e.target.value == this.movies[i].Title)
                {
                    this.control=true;
                    break;
                }
            }
            if(this.control==false||this.movies.length==0)
            {
                fetch("https://www.omdbapi.com/?i=tt3896198&apikey=6d14b00&t="+e.target.value)
                .then(movies => movies.json())
                .then(movies=> {
                    if(movies.Response=="True")
                    {
                        for(var i=0; i<this.movies.length; i++)
                        {
                            this.control=false;
                            if(movies.Title == this.movies[i].Title)
                            {
                                this.control=true;
                                break;
                            }
                        }  
                        if(this.control==false ||this.movies.length==0)
                        {   
                            this.movies.push(movies); 
                            control=false;       
                        }
                        console.log(this.movies)  
                    }
                    else if(movies.Response=="False"){
                        this.nfound=true;
                        this.control=null;
                    }
                });       
            }

        },
        delbut(tx){
            for(var i=0; i<this.movies.length; i++)
            {
                if(tx == this.movies[i].Title)
                {
                    this.index=i;
                    break;
                }
            }
            if(this.index!=-1)
            {
                this.movies.splice(this.index,1);
            }
        }
    }
    
});