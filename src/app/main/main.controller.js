export class MainController {
  constructor ($timeout,$scope, Main, toastr) {
    'ngInject';
    this.toastr = toastr;
    this.Main = Main;
    this.sendData = 'For example: {"name":"Some name","email":"some@mail.com"}'
    this.baseUrl = 'http://teletrack.ua/agro_api/047f663e-e875-43ed-8a22-edb024f425cf/tool/3/states';
    this.keyResult = {
      get:[],
      gets:[],
      post:[],
      put:[],
      delete:[]
    };

    this.Allresult = {
      get:{},
      gets:{},
      post:{},
      put:{},
      delete:{}
    };

    this.result = {
      get:null,
      gets:null,
      post:null,
      put:null,
      delete:null
    };
   

    $scope.$watch('main.visibleKeyGet',(val) => {
        if(val){
          this.result.get = JSON.stringify(this.Allresult.get[val]);
        }
    });
    $scope.$watch('main.visibleKeyGets',(val) => {
        if(val){
          this.result.gets = JSON.stringify(this.Allresult.gets[val]);
        }
    });

    $scope.$watch('main.visibleKeyPost',(val) => {
        if(val){
          this.result.post = JSON.stringify(this.Allresult.post[val]);
        }
    });

    $scope.$watch('main.visibleKeyPut',(val) => {
        if(val){
          this.result.put = JSON.stringify(this.Allresult.put[val]);
        }
    });

    $scope.$watch('main.visibleKeyDelete',(val) => {
        if(val){
          this.result.delete = JSON.stringify(this.Allresult.delete[val]);
        }
    });

  }

  sendGet(){
    let Resource = this.Main.getResource(this.baseUrl);
    Resource.get((res) => {
      this.Allresult.get = res;
      this.keyResult.get = [];
      for(let item in res){
        if(item.indexOf("$") != 0 && item != 'toJSON'){
          this.keyResult.get.push(item);
        }
      }
      if(this.visibleKeyGet){
        this.result.get = JSON.stringify(this.Allresult.get[this.visibleKeyGet]);
      }
    });
  }

  sendGetS(){
    let Resource = this.Main.getResource(this.baseUrl);
    Resource.get({Id:this.idForGet},(res) => {
      this.Allresult.gets = res;
      this.keyResult.gets = [];
      for(let item in res){
        if(item.indexOf("$") != 0 && item != 'toJSON'){
          this.keyResult.gets.push(item);
        }
      }
      if(this.visibleKeyGets){
        this.result.gets = JSON.stringify(this.Allresult.gets[this.visibleKeyGets]);
      }
    });
  }

  sendPost(){
    try { 
      let dataForSubmit = JSON.parse(this.sendData);
      let Resource = this.Main.getResource(this.baseUrl);
      new Resource(dataForSubmit).$save((res) => {
      this.Allresult.post = res;
      this.keyResult.post = [];
      for(let item in res){
        if(item.indexOf("$") != 0 && item != 'toJSON'){
          this.keyResult.post.push(item);
        }
      }
      if(this.visibleKeyPost){
        this.result.post = JSON.stringify(this.Allresult.post[this.visibleKeyPost]);
      }
    });
    } catch(e){
      this.toastr.error('Not valid data format!');
    }
  }

  sendPut(){

    try { 
      let dataForSubmit = JSON.parse(this.sendDataPut);
      let Resource = this.Main.getResource(this.baseUrl);
      dataForSubmit['Id'] = this.idForPut;
      new Resource(dataForSubmit).$update((res) => {
      this.Allresult.put = res;
      this.keyResult.put = [];
      for(let item in res){
        if(item.indexOf("$") != 0 && item != 'toJSON'){
          this.keyResult.put.push(item);
        }
      }
      if(this.visibleKeyPut){
        this.result.put = JSON.stringify(this.Allresult.put[this.visibleKeyPut]);
      }
    });
    } catch(e){
      this.toastr.error('Not valid data format!');
    }
  }

  sendDelete(){
      let Resource = this.Main.getResource(this.baseUrl);
      Resource.delete({Id:this.idForDelete},(res) => {
        this.Allresult.delete = res;
        this.keyResult.delete = [];
        for(let item in res){
          if(item.indexOf("$") != 0 && item != 'toJSON'){
            this.keyResult.delete.push(item);
          }
        }
        if(this.visibleKeyDelete){
          this.result.delete = JSON.stringify(this.Allresult.delete[this.visibleKeyDelete]);
        }
      });
  }
}
