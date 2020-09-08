import React, {useState, useEffect} from 'react';

// https://icons.expo.fyi/
import {Octicons, FontAwesome, MaterialCommunityIcons, Feather, AntDesign, Entypo, Ionicons,  MaterialIcons, FontAwesome5} from '@expo/vector-icons';

import * as Location from 'expo-location';


// https://stackoverflow.com/questions/59989963/how-do-i-convert-image-uri-into-byte-expo
import { Buffer } from "buffer";

// como enviar img para o ws
//https://stackoverflow.com/questions/32441963/how-to-use-formdata-in-react-native#answer-37019106

// para pegar o deviceid
import { 
  View,
  Text, 
  TextInput, 
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Picker,
  Image,
  Platform
} from 'react-native';

import styles from '../styles/index'
import Alertar from '../util/alertar'

// para pegar o deviceid
import Constants from 'expo-constants';

import ip from '../util/ip';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


//necessário passar como parametro o 'navigation', para criar rotas pré-definidas
export default function Cadastrar({ navigation }) {
  
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [img1, setImg1] = useState({});
  const [img2, setImg2] = useState({});
  const [img3, setImg3] = useState({});
  const [sexo, setSexo] = useState("F OU M");

  const [location, setLocation] = useState(null);

  // caso tenha erro no formulario nao manda a requisicao
  const [erroNoFormulario, setErroNoFormulario] = useState(false);

  // exibe erro em cima do input nome
  const [nomeInvalido, setNomeInvalido] = useState(false);

  // exibe erro em cima do input email
  const [emailInvalido, setEmailInvalido] = useState(false);
  
  // exibe erro em cima do input Senha
  const [senhaInvalido, setSenhaInvalido] = useState(false);

  // exibe erro em cima do input telefone
  const [telefoneInvalido, setTelefoneInvalido] = useState(false);

  // exibe erro em cima do input foto
  const [fotoInvalido, setFotoInvalido] = useState(false);

  // exibe erro em cima do input foto
  const [localizacaoInvalido, setLocalizacaoInvalido] = useState(false);

  // json da localizacao
  const [localizacaoJson, setLocalizacaoJson] = useState({});

  // resposta do ws
  const [resp, setResp] = useState({});

  // exibe gif
  const [aguarde, setAguarde] = useState(false);

  // inicio
  useEffect( () => {

    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setLocalizacaoInvalido(true);
        setErroNoFormulario(true);
      }
      else{
        setLocalizacaoInvalido(false);
        setErroNoFormulario(false);
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  async function getImg1() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        base64: true,
        aspect: [3, 5],
        quality: 1,
      });
      if (!result.cancelled) {
        setImg1(result.uri);
      }
    } catch (E) { console.log(E); }
  };

  async function getImg2() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 5],
        quality: 1,
      });
      if (!result.cancelled) {
        setImg2(result.uri);
      }
    } catch (E) { console.log(E); }
  };

  async function getImg3() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 5],
        quality: 1,
      });
      if (!result.cancelled) {
        setImg3(result.uri);
      }
    } catch (E) { console.log(E); }
  };

  async function CadastrarConta(){
    if (localizacaoInvalido) {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setLocalizacaoInvalido(true);
        setErroNoFormulario(true);
      }else{
        setLocalizacaoInvalido(false);
        setErroNoFormulario(false);
      }
      let l = await Location.getCurrentPositionAsync({});
      setLocation(l);  
    }

    if(nome.length < 5){
      setErroNoFormulario(true)
      setNomeInvalido(true)
    }else{
      setErroNoFormulario(false)
      setNomeInvalido(false)
    }

    if(email.length < 7){
      setErroNoFormulario(true)
      setEmailInvalido(true)
    }else{
      setErroNoFormulario(false)
      setEmailInvalido(false)
    }

    if(senha.length !== 4){
      setErroNoFormulario(true)
      setSenhaInvalido(true)
    }else{
      setErroNoFormulario(false)
      setSenhaInvalido(false)
    }

    if((telefone.length > 11) || (telefone.length < 9)){
      setErroNoFormulario(true)
      setTelefoneInvalido(true)
    }else{
      setErroNoFormulario(false)
      setTelefoneInvalido(false)
    }

    if( (String(img1).length === 15) && (String(img2).length === 15) && (String(img3).length === 15)){
      setErroNoFormulario(true)
      setFotoInvalido(true)
    }else{
      setErroNoFormulario(false)
      setFotoInvalido(false)
    }
    // caso tenha erro pare!, caso ok continua!
    if (erroNoFormulario) { 
      return false; 
    }else{
      let osName = Platform.OS
      let deviceId = String(Constants.deviceId)

      let obj = {
        Name: nome,
        Email: email,
        Password: senha,
        Telefone: telefone,
        OSName: osName,
        DeviceId: deviceId,
        Sexo: sexo
      }
      setResp(null)
      setAguarde(true);

    // fazer requisicao json, tentar fazer o cadasatro, caso cadastro ok, salvar fotos enviando junto o apikey
    await fetch(ip() + '/User/Create', {
        method: "POST",
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        },
        // envia o json
        body: JSON.stringify(obj)
      })

      // decode da resposta
      .then(res => res.json())
      // trabalhando com o json
      .then((result) => { 
        console.log(result)
        setResp(result)
        // caso erro
        try {
          if (result.ErrorText !== undefined) {
            Alertar("Aviso",result.ErrorText)
          }
        } 
        catch (error) {
          console.log("sem msg do ws")  
        }
      })
      .catch((error) => console.error(error))
      .finally(() => console.log("fim"));
    }
  }

  // Depois que o cadastro foi realizado, podemos cadastrar as imagens uma por uma nesse função.
  async function saveImagens() {
    // se tem img
    if (String(img1).length > 15) {
      let apikey = resp.KEY

      // Upload the image using the fetch and FormData APIs
      let formData = new FormData();
      let localUri = String(img1);
      let filename = localUri.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      formData.append('photo', { uri: localUri, name: filename, type });
        fetch(ip() + '/Photo/Create/'+resp.KEY, {
          method: 'POST',
          body: formData,
          headers: {
            'content-type': 'multipart/form-data',
          },
      });
    }

    if (String(img2).length > 15) {
      let apikey = resp.KEY

      // Upload the image using the fetch and FormData APIs
      let formData = new FormData();
      let localUri = String(img2);
      let filename = localUri.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      formData.append('photo', { uri: localUri, name: filename, type });
        fetch(ip() + '/Photo/Create/'+resp.KEY, {
          method: 'POST',
          body: formData,
          headers: {
            'content-type': 'multipart/form-data',
          },
      });
    }

    if (String(img3).length > 15) {
      let apikey = resp.KEY

      // Upload the image using the fetch and FormData APIs
      let formData = new FormData();
      let localUri = String(img3);
      let filename = localUri.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      formData.append('photo', { uri: localUri, name: filename, type });
        fetch(ip() + '/Photo/Create/'+resp.KEY, {
          method: 'POST',
          body: formData,
          headers: {
            'content-type': 'multipart/form-data',
          },
      });
    }


  //nao precisa esperar a resposta, limpa os campos
  setSenha("")
  setTelefone("")
  setEmail("")
  setResp(null) // para nao chamar a funcao save img novamente
  setImg1("")
  setImg2("")
  setImg3("")
  setAguarde(false)
  Alertar("Sucesso","Sua conta foi criado com sucesso, \n Agora ative sua conta pelo email")
  }

  // esconder caixa amarela de avisos
  console.disableYellowBox = true;

  return (
    <SafeAreaView style={[styles.container, {marginTop: 20}]}>
    { aguarde !== true &&
    <View>
    <View style={[{flexWrap: "wrap", flexDirection: "row"}, styles.bottom]} >
     <View style={{width: "20%"}} >
       <TouchableOpacity onPress={() => navigation.navigate('Login') }>
         <Text style={styles.p}>
          <Ionicons name="ios-arrow-back" size={24} style={styles.cor}/>
         </Text>
       </TouchableOpacity>
     </View>
     <View style={{width: "65%"}} >
       <TouchableOpacity>
         <Text style={[styles.p, {textAlign: "center"}]}>
         Cadastro 
         </Text>
       </TouchableOpacity>
     </View>
     <View style={{width: "15%"}} >
       <TouchableOpacity onPress={CadastrarConta}>
         <Text style={styles.p}>
         <AntDesign name="save" size={24} style={styles.cor} />
         </Text>
       </TouchableOpacity>
     </View>
     </View>
   <ScrollView>
   <View style={{padding: 10, marginBottom: 100}}>

    {/* Depois que o cadastro foi realizado, podemos cadastrar as imagens uma por uma nesse função. */}
    { resp !== null && resp.KEY !== undefined &&
      saveImagens()
    }


  {/* exibe erro na tela */}
  { nomeInvalido && <Text style={styles.corDanger} >Digite corretamente seu nome </Text> }
  <TextInput
      placeholder="Nome"
      maxLength={20}
      value={nome}
      style={styles.TextInput}
      onChangeText={t => setNome(t)} />
      <Text style={[{textAlign: "right"}, styles.cor]} >{nome.length}/20 </Text>

  {/* exibe erro na tela */}
  { emailInvalido && <Text style={styles.corDanger} >Digite corretamente seu e-mail </Text> }
  <TextInput
      placeholder="E-mail"
      maxLength={250}
      value={email}
      style={styles.TextInput}
      onChangeText={t => setEmail(t)} />
      <Text style={[{textAlign: "right"}, styles.cor]} >{email.length}/250 </Text>
      
    {/* exibe erro na tela */}
    { senhaInvalido && <Text style={styles.corDanger} >Digite corretamente sua senha</Text> }
    <TextInput
      placeholder="Senha"
      maxLength={4}
      value={senha}
      secureTextEntry={true}
      style={styles.TextInput}
      keyboardType = 'numeric'
      onChangeText={text => setSenha(text)} />
      <Text style={[{textAlign: "right"}, styles.cor]} >{senha.length}/4 </Text>

  {/* exibe erro na tela */}
  { telefoneInvalido && <Text style={styles.corDanger} >Digite corretamente seu número de telefone </Text> }
  <TextInput
      placeholder="Número com DDD"
      maxLength={11} 
      value={telefone}
      style={styles.TextInput}
      keyboardType={"numeric"}
      onChangeText={t => setTelefone(t)} />
      <Text style={[{textAlign: "right"}, styles.cor]} >{telefone.length}/11 </Text>
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <View style={{minWidth: 50, width: "10%"}}>
          <FontAwesome name="intersex" size={24} style={styles.cor} />
        </View>
        <View style={{minWidth: 50, width: "40%"}}>
          <Text style={[styles.cor, {fontSize:20}]} >Sexo </Text>
        </View>
        <View style={{minWidth: 50, width: "50%", alignItems: "center"}}>
          <Picker 
            selectedValue={sexo}
            style={[{ height: 40, width: "100%"}, styles.cor]}
            onValueChange={(itemValue, itemIndex) => setSexo(itemValue)} >
            <Picker.Item label="F" value="F" />
            <Picker.Item label="M" value="M" />
          </Picker>
        </View>
      </View>
      <View style={{width: "100%"}}>
        {/* exibe erro na tela */}
        { fotoInvalido && <Text style={styles.corDanger} >Selecione pelo menos uma foto.  </Text> }
        </View>
      <View style={{flexDirection: 'row', marginTop: 10}}>
        
        <View style={{minWidth: 50, width: "30%", margin: "1%"}}>
          <TouchableOpacity onPress={getImg1}>
          <Text style={[styles.cor, {fontSize: 20, textAlign: "center"}]}>
          <Entypo name="camera" size={24} style={styles.cor} />
          </Text>
          {/* assim que escolher a img já manda o binario para o web server */}
          {img1 && <Image source={{ uri: String(img1) }} style={{ width: 100, height: 200 }} />}
        </TouchableOpacity> 
        </View>
        <View style={{minWidth: 50, width: "30%", margin: "1%"}}>
          <TouchableOpacity onPress={getImg2}>
          <Text style={[styles.cor, {fontSize: 20, textAlign: "center"}]}>
          <Entypo name="camera" size={24} style={styles.cor} />
          </Text>
          {/* assim que escolher a img já manda o binario para o web server */}
          {img2 && <Image source={{ uri: String(img2) }} style={{ width: 100, height: 200 }} />}
        </TouchableOpacity> 
        </View>
        <View style={{minWidth: 50, width: "30%", margin: "1%"}}>
          <TouchableOpacity onPress={getImg3}>
          <Text style={[styles.cor, {fontSize: 20, textAlign: "center"}]}>
          <Entypo name="camera" size={24} style={styles.cor} />
          </Text>
          {/* assim que escolher a img já manda o binario para o web server */}
          {img3 && <Image source={{ uri: String(img3) }} style={{ width: 100, height: 200 }} />}
        </TouchableOpacity> 
        </View>
      </View>
      </View>
   </ScrollView>
   </View>
    }

    {aguarde === true &&
    <View>
      <Animated.Image
      style={{
        width: 50,
        height: 50,
        resizeMode: 'cover',
        alignSelf: "center",
        marginBottom: 20
      }}
      source={require('../assets/loading.gif')}
    />
    </View>
    }


</SafeAreaView>
  );
}