const nameListDOM = document.getElementById("userList");
const inputTextDOM = document.getElementById("name");

let userList = [];
let getUserList;

class Crud{
  static read(){
        nameListDOM.innerHTML = "";
        LocalStorage.getItem();
        if(getUserList.length === 0){
            nameListDOM.innerHTML = "Eklenmiş Kullanıcı Yok"
        }else{
            for (let i = 0; i < userList.length; i++) {
                nameListDOM.innerHTML += ` <div class="user-item">
                    <p>
                        <i class="fas fa-user"></i>
                        <span>User:</span> ${userList[i]}
                    </p>
                    <div class="buttons">
                        <button class="primary" onclick = "Crud.edit(${i})">
                            <i class="fas fa-edit"></i>
                            Düzenle
                        </button>
                        <button class="danger" onclick = " Crud.delete(${i})">
                            <i class="fas fa-trash"></i>
                            Sil
                        </button>
                    </div>
                </div>`
            };
        }
       
   };
   static create(){
        document.querySelector("form").addEventListener("submit",(e)=>{
            if(inputTextDOM.value !== ""){
                e.preventDefault();
                let inputTextValue = inputTextDOM.value;
                userList = [...userList,inputTextValue];
                LocalStorage.setItem();
                this.read();
                inputTextDOM.value = "";
            }else{
                Alert.alert()
            }
           
        });         
   }
   static delete(item){
      userList.splice(item,1);
      LocalStorage.setItem();
      this.read();
   }
   static edit(item){
        nameListDOM.innerHTML = "";
        for (let i = 0; i < userList.length; i++) {
            if(i == item){
                nameListDOM.innerHTML += ` <div class="user-item">
                    <div>
                      <p>
                        <i class="fas fa-user"></i>
                        <span>User:</span> ${userList[i]}
                      </p>
                      <input type="text" id=newName placeholder="${userList[i]}"</input>  
                    </div>
                    <div class="buttons">
                        <button class="success" onclick = "Crud.update(${i})">
                            <i class="fas fa-edit"></i>
                            Güncelle
                        </button>
                        <button class="warning" onclick = " Crud.read(${i})">
                            <i class="fas fa-cancel"></i>
                            İptal
                        </button>
                    </div>
                </div> ` 
            }else{
                nameListDOM.innerHTML += ` <div class="user-item">
                <p>
                    <i class="fas fa-user"></i>
                    <span>User:</span> ${userList[i]}
                </p>
                <div class="buttons">
                    <button class="primary" onclick = "Crud.edit(${i})">
                        <i class="fas fa-edit"></i>
                        Düzenle
                    </button>
                    <button class="danger" onclick = " Crud.delete(${i})">
                        <i class="fas fa-trash"></i>
                        Sil
                    </button>
                </div>
            </div>`
            }
            
        }
   }
   static update(item){
        let newName = document.getElementById("newName").value;
        if(newName !== ""){
            userList[item] = newName;
            LocalStorage.setItem();
            this.read();
        }else{
            Alert.alert()
        }
   }
};

class LocalStorage{
 static setItem(){
        localStorage.setItem("userList",JSON.stringify(userList));
    };
 static getItem(){
   getUserList = JSON.parse(localStorage.getItem("userList")) !== null ? JSON.parse(localStorage.getItem("userList")) : [];
   userList = getUserList;
 };
};

class Alert{
    static alert(){
        alert("Lütfen isim giriniz!");
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    Crud.read();
    Crud.create();
});