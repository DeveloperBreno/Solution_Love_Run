
// Screen EXPLORE para localizar pessoas para match,
//  recebe os cards contento as informações dos usuários.

import React, {useState, useEffect} from 'react';
import {TextInput, Image, Switch, Picker, Slider,  TouchableOpacity, Text,  ScrollView, Modal, View, AsyncStorage, SafeAreaView } from 'react-native';



import styles from '../styles/index'

// https://icons.expo.fyi/
import {Octicons, FontAwesome, MaterialCommunityIcons, Feather, AntDesign, Entypo, Ionicons,  MaterialIcons, FontAwesome5} from '@expo/vector-icons';

import CardItem from '../components/CardItem'

export default function Profile({ navigation }){
  
  function logOut() {
    // para apagar os dados do usuario em algum momento, exemplo usuario que sair da conta
    AsyncStorage.setItem('@startup', JSON.stringify(null));
    // voltar para a tela de login
    navigation.navigate('Login')
  }

  const [editarPerfil, setEditarPerfil] = useState(false);
  const [filtro, setFiltro] = useState(false);

  const [sobreMim, setSobremim] = useState("");
  const [nome, setNome] = useState("");
  
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [podeSerFumante, setPodeSerFumante] = useState(false);
  const toggleSwitchpodeSerFumante = () => setPodeSerFumante(previousState => !previousState);

  const [homem, setHomem] = useState(false);
  const toggleSwitHomem = () => setHomem(previousState => !previousState);

  const [mulher, setMulher] = useState(false);
  const toggleSwitMulher = () => setMulher(previousState => !previousState);

  const [selectedValue, setSelectedValue] = useState("F OU M");
  const [corFavorita, setCorFavorita] = useState("Sem cor");
  const [musica, setMusica] = useState("");
  const [gostoDe, setGostoDe] = useState("");
  // apenas validar se existe tamanhos nas datas e enviar ajax
  const [dia, setDia] = useState("");
  const [mes, setmes] = useState("");
  const [ano, setAno] = useState("");
  const [img, setImg] = useState({});
  
  const [deIdade, setDeIdade] = useState(18);
  const [ateIdade, setAteIdade] = useState(18);

  // caso o usuario atual nao for pro, exibe modal pra ele pagar e ser pro
  const [modalNaoPago, setModalNaoPago] = useState(false);

  // caso pago o usuario manda apenas uma mensagem, de até 150 caracteres
  const [modalPago, setModalPago] = useState(false);
  
  // modal ver pessoas que gostaram de mim
  const [verLikes, setVerLikes] = useState(false);

  // caso tenha algum erro de digitação na msg 
  const [msgValida, setMsgValida] = useState(true);

  const [msg, setMsg] = useState("");

  // para saber se a msg já foi enviada para a mesma pessoa
  const [msgEnviada, setMsgEnviada] = useState(Boolean);

  function validarDataNascimento() {
    // var x = new Date(mes +" "+dia+" "+ano);
    var x = new Date(parseInt(ano), parseInt(mes), parseInt(dia));
    if (String(x) == 'Invalid Date') {
      setDia("");
      setmes("");
      setAno("");
    }else{
      var mais18 = new Date(parseInt(ano) + 18, parseInt(mes), parseInt(dia));
      if (mais18 >= new Date()){ setAno(""); }
    }
  }
  

  async function getImg() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 5],
        quality: 1,
      });
      if (!result.cancelled) {
        setImg(result.uri);
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  function exibirChatModal(guid){
    console.log("recuperar chat e exibir msgs no modal");
    console.log(guid);

    // caso pago  
    setModalPago(true);

  }

  function likeBack(guid){
    console.log("dar like para o guid da pessoa");
    console.log(guid);
  }

  function _setDeIdade(idade){
    setDeIdade(idade);
    if (idade > ateIdade) {
      setAteIdade(idade);
    }
  }

  function _setAteIdade(idade){
    setAteIdade(idade);
    if (idade < deIdade) {
      setDeIdade(idade);
    }
  }

  async function enviarMensagem(){
    let mensagem = await ValidaTexto(msg);
    setMsg(mensagem);
    // se existe a mensagem, enviar
    if (mensagem.length !== 0) {
      // ocultar o erro
      setMsgValida(true);
      // fazer ajax para ws
      // fazer depois

      // ocultar campos que aparecem antes do envio 
      setMsgEnviada(true);

    }
    // se não existe a msg, alertar
    else{
      // exibir na tela o erro
      setMsgValida(false);
    }
  }

  function testeAjaxLocal(){
    Ajax('read',null);
  }

  function naoGostei(guid){
    console.log(guid);
    // fetch('https://elidocinhos.com/applr/IPessoa.json')
    fetch('https://viacep.com.br/ws/01001000/json/')
    .then((response) => response.json())
    .then((json) => 
    console.log(json)
    )
    .catch((error) => console.error("Eba erro: "+error))
    .finally(() => console.log("fim"));
      }

  function mandarMsg(msg, guid){
    console.log("nova msg: ");
    console.log(guid);
    console.log(msg);
  }
// esconder caixa amarela de avisos
console.disableYellowBox = true;

  return (
   
    <SafeAreaView style={styles.container}>
      <ScrollView >
        <View style={{marginTop: 20}}>

 {/* Modal seja pro*/}
 <Modal  visible={modalNaoPago}>
        <SafeAreaView style={styles.container}>
        <View >
        <View style={[{flexWrap: "wrap", flexDirection: "row"}, styles.bottom]} >
         <View style={{width: "20%"}} >
           <TouchableOpacity onPress={() => setModalNaoPago(false)}>
             <Text style={styles.p}>
               <AntDesign name="close" size={24} style={styles.cor} /> 
             </Text>
           </TouchableOpacity>
         </View>
         <View style={{width: "60%"}} >
           <TouchableOpacity>
             <Text style={[styles.p, {textAlign: "center"}]}>
             Seja pro
             </Text>
           </TouchableOpacity>
         </View>
         </View>
       <ScrollView>
       <View style={{padding: 10, marginBottom: 100}}>
        <Text style={styles.p}>
        Seja pro, envie mensagens livremente, interaja com quem gostou de você.   <MaterialCommunityIcons name="professional-hexagon" size={24} style={styles.corPro} />
        </Text>
        <TouchableOpacity style={{alignItems: "center", backgroundColor: ""}}>
          <Text style={styles.p}>
          <FontAwesome name="shopping-cart" size={24} style={styles.cor} /> Add ao carrinho
          </Text>
        </TouchableOpacity>
       </View>
       </ScrollView>
       </View>
    </SafeAreaView>
        </Modal>

        <Modal  visible={modalPago}>
        <SafeAreaView style={[styles.container]}>
        <View>
        <View style={[{flexWrap: "wrap", flexDirection: "row"}, styles.bottom]} >
         <View style={{width: "15%"}} >
           <TouchableOpacity onPress={() => setModalPago(false)}>
             <Text style={styles.p}>
               <AntDesign name="close" size={24} style={styles.cor} /> 
             </Text>
           </TouchableOpacity>
         </View>
         <View style={{width: "80%"}} >
           <TouchableOpacity>
             <Text style={[styles.p, {textAlign: "left"}]}>
             Nome da outra pessoa
             </Text>
           </TouchableOpacity>
         </View>
         </View>
       <ScrollView>
       <View style={{padding: 10, marginBottom: 100}}>

        {/* se ainda não mandou msg para essa pessoa  */}
        <Text style={styles.p}>
        Escreva apenas uma mensagem como primeiro contato  
        </Text>
          {/* se ainda não mandou msg para essa pessoa  */}
          <TextInput 
             style={[styles.TextInpu, {height: 80}]} 
             multiline={true} 
             placeholder="Digite sua mensagem." 
             maxLength={150}
             value={msg}
             onChangeText={t => setMsg(t)}            
             />
          {/* se tiver erro na msg digitada */}
          { msgValida === false &&
          <Text style={[styles.corDanger, {fontSize: 15}]}>
            Digite corretamente! <MaterialIcons name="error" size={18} style={styles.corDanger} />
          </Text>
          }

          
            {/* se ainda não mandou msg para essa pessoa  */}
            <TouchableOpacity style={{alignItems: "center", backgroundColor: ""}} onPress={enviarMensagem}>
            <Text style={styles.p}>
              <Octicons name="comment" size={24} style={styles.cor} /> Enviar
            </Text>
          </TouchableOpacity>

       
        {/* se msg já foi enviada para a mesma pessoa, apenas para o usuario atual ver na tela que a msg dele foi emviada*/}
        { msgEnviada === true &&
            <TouchableOpacity>
              <Text style={[{textAlign: "center", fontSize: 22, borderColor: "#cdcdcd", borderWidth: 1, borderRadius: 10}, styles.cor]}>
                {msg + "\nEnviado com sucesso!"}
              </Text>
            </TouchableOpacity>
        }

        
       </View>
       </ScrollView>
       </View>
    </SafeAreaView>
        </Modal>

        {/* editar perfil */}
        <Modal  visible={editarPerfil}>
        <SafeAreaView style={styles.container}>
        <View>
        <View style={[{flexWrap: "wrap", flexDirection: "row"}, styles.bottom]} >
         <View style={{width: "20%"}} >
           <TouchableOpacity onPress={() => setEditarPerfil(false)}>
             <Text style={styles.p}>
               <AntDesign name="close" size={24} style={styles.cor} /> 
             </Text>
           </TouchableOpacity>
         </View>
         <View style={{width: "60%"}} >
           <TouchableOpacity>
             <Text style={[styles.p, {textAlign: "center"}]}>
               Perfil
             </Text>
           </TouchableOpacity>
         </View>
         <View style={{width: "20%"}} >
           <TouchableOpacity>
             <Text style={[styles.p, {textAlign: "right"}]}>
               <Feather name="save" size={24} style={styles.cor} />
             </Text>
           </TouchableOpacity>
         </View>
         </View>
      
       <ScrollView>
       <View style={{padding: 10, marginBottom: 100}}>
         <View>

         <TouchableOpacity onPress={getImg}>
        <Text style={[styles.cor, {fontSize: 20, textAlign: "center"}]}>
        Selecionar uma imagem <Entypo name="camera" size={24} style={styles.cor} />
        
        </Text>
        {/* assim que escolher a img já manda o binario para o web server */}
        {img && <Image source={{ uri: String(img) }} style={{ width: 100, height: 200 }} />}

      </TouchableOpacity> 
       <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
          <View style={{alignItems: "center", width: "33%"}}>
            <Image style={[styles.tinyLogo, {borderRadius: 2, margin: 2}]}
            source={{ uri: 'https://i.pinimg.com/originals/73/b4/5b/73b45b5636546b361e35012f483ed85f.jpg' }} />
              <AntDesign name="delete" size={24} style={styles.corDanger} />
          </View>
          <View style={{alignItems: "center", width: "33%"}}>
            <Image style={[styles.tinyLogo, {borderRadius: 2, margin: 2}]}
            source={{ uri: 'https://i.pinimg.com/originals/73/b4/5b/73b45b5636546b361e35012f483ed85f.jpg' }} />
              <AntDesign name="delete" size={24} style={styles.corDanger} />
          </View>
          <View style={{alignItems: "center", width: "33%"}}>
            <Image style={[styles.tinyLogo, {borderRadius: 2, margin: 2}]}
            source={{ uri: 'https://i.pinimg.com/originals/73/b4/5b/73b45b5636546b361e35012f483ed85f.jpg' }} />
              <AntDesign name="delete" size={24} style={styles.corDanger} />
          </View>
        </View>
      </View>

      <TextInput 
             style={[styles.TextInpu, {height: 80}]} 
             multiline={true} 
             placeholder="Nome" 
             maxLength={20}
             value={nome}
             onChangeText={t => setNome(t)}            
             />
              <Text style={[styles.p, {fontSize: 15, margin: 0, padding: 0, textAlign: "right"}]}>
             {nome.length}/20
           </Text>

       <TextInput 
             style={[styles.TextInpu, {height: 80}]} 
             multiline={true} 
             placeholder="Sobre mim" 
             maxLength={150}
             value={sobreMim}
             onChangeText={t => setSobremim(t)}            
             />
              <Text style={[styles.p, {fontSize: 15, margin: 0, padding: 0, textAlign: "right"}]}>
             {sobreMim.length}/150
           </Text>
       <Text  style={[styles.cor, {fontSize: 20}]}>
         <Entypo name="info-with-circle" size={24} /> Digite oque você gosta, exemplo: “Corrida em montanha”
       </Text>
        <TextInput 
             style={[styles.TextInpu, {marginTop: 10}]} 
             multiline={true} 
             placeholder="Gosto de" 
             maxLength={20}
             value={gostoDe}
             onChangeText={t => setGostoDe(t)}  
             />
             <Text style={[styles.p, {fontSize: 15, margin: 0, padding: 0, textAlign: "right"}]}>
             {gostoDe.length}/20
           </Text>
           <TextInput 
             style={[styles.TextInpu, {marginTop: 10}]} 
             multiline={true} 
             placeholder="Qual é a sua música preferida?" 
             maxLength={20}
             value={musica}
             onChangeText={t => setMusica(t)}  
             />
             <Text style={[styles.p, {fontSize: 15, margin: 0, padding: 0, textAlign: "right"}]}>
             {musica.length}/20
           </Text>

           <Text style={[styles.cor, {fontSize:20}]}>
             <MaterialIcons name="date-range" size={24} style={styles.cor}/> Data de nascimento
           </Text>
                    <View style={[{flexDirection: 'row', marginBottom: 10}]}>
             <View style={{width: "32%"}} >
               <TextInput onChangeText={dd => setDia(dd)} value={dia} keyboardType="numeric" style={styles.TextInpu} placeholder="dd" maxLength={2}/>
             </View>
             <View style={{width: "32%" , marginRight: "1%", marginLeft: "1%"}} >
               <TextInput onChangeText={mm => setmes(mm)} value={mes} keyboardType="numeric" style={styles.TextInpu} placeholder="mm" maxLength={2}/>
             </View>
             <View style={{width: "32%" , marginRight: "1%"}} >
               <TextInput onChangeText={yyyy => setAno(yyyy)} value={ano} keyboardType="numeric" style={styles.TextInpu} placeholder="yyyy" maxLength={4} />
             </View>
           </View>
                      {dia.length + mes.length + ano.length !== 8 &&  
             <Text style={styles.corDanger}><Feather name="alert-triangle" size={15} style={styles.corDanger} /> Digite a data corretamente.</Text>
              }
             {dia.length + mes.length + ano.length === 8 && validarDataNascimento() }

              <View style={{flexDirection: 'row', marginTop: 10}}>
               <View style={{minWidth: 50, width: "10%"}}>
                 <MaterialIcons name="smoking-rooms" size={24} style={[styles.cor]} />
               </View>
               <View style={{minWidth: 50, width: "60%"}}>
                 <Text style={[styles.cor, {fontSize:20}]}>Sou fumante </Text>  
               </View>
               <View style={{minWidth: 50, width: "20%", alignItems: "center"}}>
                 <Switch
                   trackColor={{ false: "#b9b7b7", true: "#5f6368" }}
                   thumbColor={isEnabled ? "#5f6368" : "#b9b7b7"}
                   ios_backgroundColor="#5f6368"
                   onValueChange={toggleSwitch}
                   value={isEnabled} />  
              </View>
             </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
               <View style={{minWidth: 50, width: "10%"}}>
                 <FontAwesome name="intersex" size={24} style={styles.cor} />
               </View>
               <View style={{minWidth: 50, width: "40%"}}>
                  <Text style={[styles.cor, {fontSize:20}]} >Sexo *</Text>
               </View>
               <View style={{minWidth: 50, width: "50%", alignItems: "center"}}>
                 <Picker 
                   selectedValue={selectedValue}
                   style={[{ height: 40, width: 100}, styles.cor]}
                   onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)} >
                   <Picker.Item label="F" value="F" />
                   <Picker.Item label="M" value="M" />
                 </Picker>
               </View>
             </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
               <View style={{minWidth: 50, width: "10%"}}>
                 <Entypo name="resize-100-" size={24}  style={styles.cor} />
               </View>
               <View style={{minWidth: 50, width: "40%"}}>
                  <Text style={[styles.cor, {fontSize:20}]} >Altura</Text>
               </View>
               <View style={{minWidth: 50, width: "50%", alignItems: "center"}}>
                 <TextInput keyboardType="numeric" style={[styles.TextInpu, {textAlign: "center", width: 100, height: 35}]} placeholder="1.75"  maxLength={4} />
               </View>
             </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
               <View style={{minWidth: 50, width: "10%"}}>
               <FontAwesome5 name="weight-hanging" size={24} style={styles.cor} />
               </View>
               <View style={{minWidth: 50, width: "40%"}}>
                  <Text style={[styles.cor, {fontSize:20}]} >Peso</Text>
               </View>
               <View style={{minWidth: 50, width: "50%", alignItems: "center"}}>
               <TextInput keyboardType="numeric" style={[styles.TextInpu, {textAlign: "center", width: 100, height: 35}]} placeholder="70"  maxLength={4} />
               </View>
             </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
               <View style={{minWidth: 50, width: "10%"}}>
               <Ionicons name="ios-color-palette" size={24} style={styles.cor} />
               </View>
               <View style={{minWidth: 50, width: "40%"}}>
                  <Text style={[styles.cor, {fontSize:20}]} >{corFavorita}</Text>
               </View>
               <View style={{minWidth: 50, width: "50%", alignItems: "center"}}>
               <TouchableOpacity onPress={() => setCorFavorita('Sem cor')}>
                <FontAwesome name="times" size={30} style={styles.cor} />
              </TouchableOpacity>
              </View>
             </View>
              <View style={{alignItems: "center", marginTop: 10 }}>
                <View style={{flexWrap: "wrap", flexDirection: "row"}}>
                  <TouchableOpacity onPress={() => setCorFavorita('Preto')} style={[styles.btnSetCor, {backgroundColor: "#000"}]} ></TouchableOpacity>
                  <TouchableOpacity onPress={() => setCorFavorita('Vermelho')} style={[styles.btnSetCor,{backgroundColor: "#e00904"}]} ></TouchableOpacity>
                  <TouchableOpacity onPress={() => setCorFavorita('Laranja')} style={[styles.btnSetCor, {backgroundColor: "#f5873b"}]} ></TouchableOpacity>
                  <TouchableOpacity onPress={() => setCorFavorita('Amarelo')} style={[styles.btnSetCor, {backgroundColor: "#ffba00"}]} ></TouchableOpacity>
                </View>
                <View style={{flexWrap: "wrap", flexDirection: "row"}}>
                  <TouchableOpacity onPress={() => setCorFavorita('Verde')} style={[styles.btnSetCor, {backgroundColor: "#11772d"}]} ></TouchableOpacity>
                  <TouchableOpacity onPress={() => setCorFavorita('Azul')} style={[styles.btnSetCor, {backgroundColor: "#174580"}]} ></TouchableOpacity>
                  <TouchableOpacity onPress={() => setCorFavorita('Roxo')} style={[styles.btnSetCor, {backgroundColor: "#451e5d"}]} ></TouchableOpacity>
                  <TouchableOpacity onPress={() => setCorFavorita('Roza')} style={[styles.btnSetCor, {backgroundColor: "#c27ac0"}]} ></TouchableOpacity>
                </View>
              </View>
       </View>
       </ScrollView>
       </View>
    </SafeAreaView>
    
        </Modal>


      

        

        {/* editar filtro */}
        <Modal  visible={filtro}>
        <SafeAreaView style={styles.container}>
        <View>
        <View style={[{flexWrap: "wrap", flexDirection: "row"}, styles.bottom]} >
         <View style={{width: "20%"}} >
           <TouchableOpacity onPress={() => setFiltro(false)}>
             <Text style={styles.p}>
               <AntDesign name="close" size={24} style={styles.cor} /> 
             </Text>
           </TouchableOpacity>
         </View>
         <View style={{width: "60%"}} >
           <TouchableOpacity>
             <Text style={[styles.p, {textAlign: "center"}]}>
               Filtro
             </Text>
           </TouchableOpacity>
         </View>
         <View style={{width: "20%"}} >
           <TouchableOpacity>
             <Text style={[styles.p, {textAlign: "right"}]}>
               <Feather name="save" size={24} style={styles.cor} />
             </Text>
           </TouchableOpacity>
         </View>
         </View>
      
       <ScrollView>
       <View style={{padding: 10, marginBottom: 100}}>
       <Text style={[styles.cor, {fontSize: 20}]}>
       <MaterialCommunityIcons name="arrow-up-down-bold-outline" size={24} style={styles.cor} /> Filtro de idade
        </Text>  
       <Text style={[styles.cor, {fontSize: 20}]}>
             De {String(parseInt(deIdade))} anos de idade
        </Text>
       <Slider
          value={deIdade}
          onValueChange={(deIdade) => _setDeIdade(deIdade)}
          maximumValue={100}
          minimumValue={18} />

        <Text style={[styles.cor, {fontSize: 20}]}>
           Até {String(parseInt(ateIdade))} anos de idade
        </Text>
       <Slider
          thumbStyle={styles.thumb}
          value={ateIdade}
          onValueChange={(ateIdade) => _setAteIdade(ateIdade)}
          maximumValue={100}
          minimumValue={18} />

            <View style={{flexDirection: 'row', marginTop: 10}}>
               <View style={{minWidth: 50, width: "10%"}}>
                 <MaterialIcons name="smoking-rooms" size={24} style={[styles.cor]} />
               </View>
               <View style={{minWidth: 50, width: "60%"}}>
                 <Text style={[styles.cor, {fontSize:20}]}>Pode ser fumante </Text>  
               </View>
               <View style={{minWidth: 50, width: "20%", alignItems: "center"}}>
                 <Switch
                   trackColor={{ false: "#b9b7b7", true: "#5f6368" }}
                   thumbColor={podeSerFumante ? "#5f6368" : "#b9b7b7"}
                   ios_backgroundColor="#5f6368"
                   onValueChange={toggleSwitchpodeSerFumante}
                   value={podeSerFumante} />  
               </View>
             </View>

             <View style={{flexDirection: 'row', marginTop: 10}}>
               <View style={{minWidth: 50, width: "10%"}}>
                <Entypo name="man" size={24} style={styles.cor} />
               </View>
               <View style={{minWidth: 50, width: "60%"}}>
                 <Text style={[styles.cor, {fontSize:20}]}>Homem </Text>  
               </View>
               <View style={{minWidth: 50, width: "20%", alignItems: "center"}}>
                 <Switch
                   trackColor={{ false: "#b9b7b7", true: "#5f6368" }}
                   thumbColor={homem ? "#5f6368" : "#b9b7b7"}
                   ios_backgroundColor="#5f6368"
                   onValueChange={toggleSwitHomem}
                   value={homem} />  
               </View>
             </View>

             <View style={{flexDirection: 'row', marginTop: 10}}>
               <View style={{minWidth: 50, width: "10%"}}>
               <Ionicons name="ios-woman" size={24} style={[styles.cor, {paddingLeft: 5}]} />
               </View>
               <View style={{minWidth: 50, width: "60%"}}>
                 <Text style={[styles.cor, {fontSize:20}]}>Mulher </Text>  
               </View>
               <View style={{minWidth: 50, width: "20%", alignItems: "center"}}>
                 <Switch
                   trackColor={{ false: "#b9b7b7", true: "#5f6368" }}
                   thumbColor={mulher ? "#5f6368" : "#b9b7b7"}
                   ios_backgroundColor="#5f6368"
                   onValueChange={toggleSwitMulher}
                   value={mulher} />  
               </View>
             </View>
        
       </View>
       </ScrollView>
       </View>
    </SafeAreaView>
    
        </Modal>
          <View style={{alignItems: "center"}}>
            <TouchableOpacity>
          <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://i.pinimg.com/originals/73/b4/5b/73b45b5636546b361e35012f483ed85f.jpg',
        }}
      />
      <Text style={styles.title}>
          Isi Felix 
        </Text>
      </TouchableOpacity> 
      </View>
      <View style={{marginLeft: 10}}>
      <View style={{padding: 10}}>
        {/* conteudo aqui */}
        <TouchableOpacity>
        <Text style={styles.p}>
        {/* <MaterialCommunityIcons name="professional-hexagon" size={25} style={styles.corPro} /> */}
          Envie mensagem, interaja com quem gostou de você, por R$ 10 mês
        </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={testeAjaxLocal}>
          <View style={[{alignSelf: "center",borderRadius: 100, paddingLeft: 5, paddingRight: 5 }, styles.fundoPro]}>
            <Text style={[styles.p, {color: "#fff"}]}>
             Pagar com débito 
            </Text>
          </View>
        </TouchableOpacity>
       </View>
      <TouchableOpacity onPress={() => setEditarPerfil(true)}>
        <Text style={[styles.p]}>
        <Feather name="edit-2" size={24} style={styles.cor} /> Editar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setFiltro(true)}>
        <Text style={[styles.p]}>
        <AntDesign name="filter" size={24} style={styles.cor} /> Filtro
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={logOut}>
        <Text style={[styles.p]}>
        <AntDesign name="logout" size={24} style={styles.cor} /> Sair
        </Text>
      </TouchableOpacity>

      </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    );

  }