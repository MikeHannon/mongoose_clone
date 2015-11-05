var baseSchema = function(){
  var that = this;
  this.data = [];


  this.add = function(new_data){//new_data all of the information about the object, minus the methods: e.g. 'name':'moe', 'email': 'moe@gmail.com'
    var local_data;
    var myLocal = this;
    var local_column_populated = [];
    var other_data = function(){
      return that.data;
    }
    this.mydata = other_data();
    new_data['callback'] = function(){
      return myLocal;
    }
    new_data['exec'] = function(){
      console.log(this);
      return this;
    }
    new_data['_id'] = Math.floor(Math.random()*100000000);
    new_data['populate'] = function(column){
      console.log(column);
      for (var i = 0; i < this[column].length; i++){
        console.log(this[column][i]['type']);
        // console.log(book['callback']());
        for(var j = 0; j < book['data'].length; j ++){

          // console.log(book.data[j]);

          if (this[column][i]['type'] == book['data'][j]['id']){
            local_column_populated.push(book['data'][j]);
          }
        }
      }
      console.log(local_column_populated);
      this[column]=local_column_populated;
      return this;
      // console.log(this);
    }
    local_data = new_data;
    that.data.push(new_data);
    return this;
  }


  this.find = function(key,value){
    for (var i = 0; i <that.data.length; i ++){
      if (that.data[i][key] == value){
        console.log(that.data[i]);
        return that.data[i];
      }
    }
  }
}
// in mongoose when we populate:
// thing_to_populate: array({type:schema.object.id, ref:Schema})
var book = new baseSchema()
var myBase = new baseSchema();


book.add({'id' : 1, 'title':'grapes of wrath'});
book.add({'id' : 2, 'title':'catcher in the rye'});
book.add({'id' : 3, 'title': 'the martian'});
book.add({'id' : 4, 'title': 'mars'});
book.add({'id' : 5, 'title': 'foundation'});

myBase.add({
  'name':'moe',
  'email': 'moe@gmail.com',
  'things_to_populate':[{"type":1, 'schema': book},{"type":2, 'schema': book},{"type":3, 'schema': book}]});
myBase.add({'name':'moe2', 'email': 'moe2@gmail.com','things_to_populate':[{"type":1, 'schema': book},{"type":2, 'schema': book},{"type":3, 'schema': book}]});

myBase.add({
  'name':'Mike',
  'email': 'Mike@gmail.com',
  'things_to_populate':[
      {"type":1,
       'schema': 'book'},{"type":4, 'schema': 'book'},{"type":5, 'schema': 'book'}]});
myBase.find('name', 'Mike').populate('things_to_populate').exec();
