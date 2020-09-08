
import React, {useState, useEffect} from 'react';

// https://icons.expo.fyi/
import { SimpleLineIcons, MaterialCommunityIcons, Feather, AntDesign,FontAwesome5 } from '@expo/vector-icons';

import { 
  View,
  Text, 
  TextInput, 
  KeyboardAvoidingView, 
  TouchableOpacity,
  Animated,
  Keyboard,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Modal,
  SafeAreaView,
  Switch,
  AsyncStorage
} from 'react-native';

import styles from '../styles/index'
import Alertar from '../util/alertar'

// para pegar o deviceid
import Constants from 'expo-constants';
import ip from '../util/ip';

//necessário passar como parametro o 'navigation', para criar rotas pré-definidas
export default function Login({ navigation }) {
  const [offset] = useState(new Animated.ValueXY( {x: 0, y: 95} ))
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY( {x: 192.15, y: 170.1 } ))
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [erroEmail, setErroEmail] = useState(false);
  const [senha, setSenha] = useState("");
  const [erroSenha, setErroSenha] = useState(false);
  const [aguarde, setAguarde] = useState(false);
  // caso tente recuperar a senha mas não informou o email
  const [modalErroEmail, setModalErroEmail] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isEnabled, setIsEnabled] = useState(false);
  const [dadosWS, setDadosWS] = useState({});
  // caso logado ok
  const [logado, setLogado] = useState(false);
  let obj = { DeviceId: String(Constants.deviceId) }
  console.log("\n\n\n\n esse é seu device id copie e cole no ws em loginController na def /teste/ essa def cria um obj pessoa no bd!!")
  console.log(Constants.deviceId)
  // quando abrir o app, já valida se tem dados salvos em sqlLite
  AsyncStorage.getItem('@startup')
  // from slqLite to json
  .then(req => JSON.parse(req))
  // working with json
  .then(json => {
          console.log("\n\n teste:");
          console.log(json);
          // tem conta salva em sqlLIte
          if (json !== null && json.APIkey.length > 5){ 
            navigation.navigate('MyTabs')
          }
      })
    // caso erro, ou seja se nao tem sqlLite ainda
  .catch(error => console.log('error!'));
  useEffect( () => {
    // quando abrir o app, já valida se tem dados salvos em sqlLite
    AsyncStorage.getItem('@startup')
    // from slqLite to json
    .then(req => JSON.parse(req))
    // working with json
    .then(json => {
            console.log("\n\n teste:");
            console.log(json);
            // tem conta salva em sqlLIte
            if (json !== null && json.APIkey.length > 5){ 
              navigation.navigate('MyTabs')
             }
         })
       // caso erro, ou seja se nao tem sqlLite ainda
    .catch(error => console.log('error!'));

    // se não tiver dados em sqlLite, tente fazer o ajax e recuperar as contas relacionadas ao dispositivo
    fetch(ip() + '/Login/ConnectedAccounts', {
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
      console.log(result);
      // insere os emails das contas relacionadas
      setData(result);
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));

    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    //passar masi de uma animação ao mesmo tempo
    Animated.parallel([
      Animated.spring(offset.y, {
        // useNativeDriver: false,
        toValue: 0,
        speed: 4,
        bounciness: 20,
      }),
    Animated.timing(opacity, {
        // useNativeDriver: false,
        toValue: 1,
        duration: 300,
      })

    ]).start();

  }, []);

    // duas maneiras de utilizar funções
    // não pode ser utilizado 'useNativeDriver = true', 
    // pois não é suportado em forma de estilos, apenas para transformações
    // apenas 10% de diferenca da animacao
    const _keyboardDidShow = () => {
      Animated.parallel([
        Animated.timing(logo.x, {
          toValue: 135,
        }),
        Animated.timing(logo.y, {
          toValue: 120,
        }),
      ]).start();
    };

    function _keyboardDidHide() {
      Animated.parallel([
        Animated.timing(logo.x, {
          toValue: 148.5,
        }),
        Animated.timing(logo.y, {
          toValue: 132,
        }),
      ]).start();
    };

    function esqueciMinhaSenha(){
      setErroEmail(false);
      // caso erro exibe p/ usuario
      if (email.length < 5) { setErroEmail(true); }
      // caso email invalido, exibe p/ usuario
      if (erroEmail) {
        setModalErroEmail(true);
      }
      // caso ok
      else{
        console.log('exibe gif loading') ;
        setAguarde(true);
        
        // caso email ok, manda ajax
        fetch(ip() + '/Login/RecoverPassword', {
        method: "POST",
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        },
        // envia o json
        body: JSON.stringify({ Email: email })
      })

      // decode da resposta
      .then(res => res.json())
      // trabalhando com o json
      .then((result) => { 
           Alertar("",result.ErrorText);
           
           setAguarde(false)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
      }
    }
  
    async function entrarAutomaticamente(text){
      setSenha(text);
      if (text.length === 4) {
        Trylogin(text)
      }
    }

  async function Trylogin(text="") {
    // getSearchList = async () => {
    setAguarde(true);

    setErroEmail(false);

    if(text=== ""){
      text = senha;
    }

    // caso erroexibe p/ usuario
    if (email.length < 5) { setErroEmail(true); }

    setErroSenha(false);
    // caso erroexibe p/ usuario
    if (text.length != 4) { setErroSenha(true); }

    // se tudo ok, manda ajax
    if (erroSenha == false && erroEmail == false) {
      let obj = {Email: email, Password: text};

      // exibir msg "aguarde..."

      // PROC002 mandar email e senha para webServer
      // useEffect(() => {
    let resp = await fetch(ip() +'/Login/Connecting', {
          method: "POST",
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(obj)
        })
        .then(res => res.json())
        .then((result) => { 
          // tenta exibir o erro
          try {
            if (result.ErrorText !== undefined && result.ErrorText.length > 2) {
              
              // img gif loadding
              setAguarde(false);

              // funcao dinamica para usar os alerts
              Alertar('',result.ErrorText) 
              
              // caso logado sera redirecionado para a tela principal de usuario logado
              setLogado(false) 
            }
          } 
          // login ok
          catch (error) {
            // apenas para debug
            console.log(result);
          }

          // tenta pegar apikey, caso login ok
          try {
            // se estiver tudo ok
            if (result.APIkey !== undefined && result.APIkey.length > 5) {
              setEmail("");
              setSenha("");
              setIsEnabled(false)
              
              // caso logado
              setLogado(true);
              // apenas poe o json do ws em uma constante
              setDadosWS(result);
                // se o usuario clicou em "entrar automaticamente" gravar em sql lite
                if (isEnabled) {
                  // gravar em sqlLite o aapiKey, e todos os dados que veio via ws
                  //teste sem conta logada salva no sqlLite
                  AsyncStorage.setItem('@startup', JSON.stringify(result));
                }
                navigation.navigate('MyTabs')
            }
          } catch (error) {
            // apenas para debug
            console.log("nao logado")
          }
        })

        // caso erro apenas print
        .catch((error) => console.error(error))
        // caso alguma campo de
        .finally( () => {console.log("fim")});

        
      //}, []);
    }
    setAguarde(false);
  }

  function mudarParaTelaInicial(){
    // caso o usuario clique em sair
    setLogado(false)
    // mudar para a tela inicial de usurio logado
    navigation.navigate('MyTabs')
  }

  // esconder caixa amarela de avisos
  console.disableYellowBox = true;

  return (
    <KeyboardAvoidingView style={styles.background}>

      <View style={styles.containerLogo} >

      {aguarde === false &&
        <TouchableOpacity>
        <Animated.Image
          style={{
            width: logo.x,
            height: logo.y,
            resizeMode: 'cover',
          }}
          source={require('../assets/logo.png')}
        />
        </TouchableOpacity>
        }
        
        {/* caso estaja valido com o ws  */}
        {logado === true && 
          mudarParaTelaInicial()
        }

        {aguarde === true &&
          <Animated.Image
          style={{
            width: 192.15,
            height: 170.1,
            resizeMode: 'cover',
            alignSelf: "center",
            marginBottom: 20
          }}
          source={require('../assets/loading.gif')}
        />
        }
        
      </View>

      <Animated.View
        style={[
          styles.containerComponents,
          {
            opacity: opacity,
            transform: [
              { translateY: offset.y }
            ]
          }
        ]}
      >

        {/* caso erro ao recuperar senha */}
        <Modal  visible={modalErroEmail}>
        <SafeAreaView style={styles.container}>
        <View style={[{flexWrap: "wrap", flexDirection: "row"}, styles.bottom]} >
         <View style={{width: "20%"}} >
           <TouchableOpacity onPress={() => setModalErroEmail(false)}>
             <Text style={styles.p}>
               <AntDesign name="close" size={24} style={styles.cor} /> 
             </Text>
           </TouchableOpacity>
         </View>
         <View style={{width: "60%"}} >
           <TouchableOpacity>
             <Text style={[styles.p, {textAlign: "center"}]}>
             Recuperar senha
             </Text>
           </TouchableOpacity>
         </View>
         </View>
       <ScrollView>
       <View style={{padding: 10, marginBottom: 100}}>
        <Text style={styles.p}>
          Para recuperar sua senha, digite seu e-mail corretamente!
        </Text>

        <TouchableOpacity onPress={() => setModalErroEmail(false)} style={{alignItems: "center", backgroundColor: ""}}>
          <Text style={styles.p}>
          <AntDesign name="like2" size={24} style={styles.cor} /> Ok
          </Text>
        </TouchableOpacity>
       </View>
       </ScrollView>
    </SafeAreaView>
        </Modal>

       { aguarde === false &&
       <ScrollView style={{width: "100%"}}> 
        {/* caso o dispositivo tenha conta relacionada */}
        <View>
        {data !== undefined && data.length > 0 && 
          <Text style={[styles.p, {marginBottom: 0, paddingBottom:0, textAlign: "center"}]}>
            Contas associadas 
          </Text>
        }

        { isLoading ? <ActivityIndicator style={{display: "none"}} /> : (
          <View style={{marginBottom: 10}}>
          <FlatList
            data={data}
            //keyExtractor={({ Email }, Email.length) => Email}
            renderItem={({ item }) => (
              <TouchableOpacity  onPress={() => setEmail(String(item.Email))}>
                <Text style={[styles.p, {textAlign: "left",  marginTop: 1, fontSize: 15, padding:2 }]}  > 
                <SimpleLineIcons name="link" size={12}  /> {item.Email}</Text>
              </TouchableOpacity>
            )}
          />
          </View>
        )} 
        </View>

         {/* exibe erro na tela */}
  { erroEmail && <Text style={styles.corDanger} >Digite corretamente seu e-mail </Text> }
  <TextInput
      placeholder="E-mail"
      maxLength={250}
      value={email}
      style={styles.TextInput}
      onChangeText={t => setEmail(t)} />
         
    {/* exibe erro na tela */}
    { erroSenha && <Text style={styles.corDanger} >Digite corretamente sua senha</Text> }
    <TextInput
      placeholder="Senha"
      maxLength={4}
      value={senha}
      secureTextEntry={true}
      style={styles.TextInput}
      keyboardType = 'numeric'
      onChangeText={text => entrarAutomaticamente(text)} />

      
      <View style={{flexWrap: "wrap", flexDirection: "row"}}>

      <View style={{flexDirection: 'row', marginTop: 10, width: "50%"}}>
               <View style={{}}>
               
               <Text style={[styles.p, {fontSize:15}]}>
                 <FontAwesome5 name="save" size={24} style={styles.cor} /> Salvar</Text>  
               </View>
               <View style={{paddingTop:10}}>
                 <Switch
                   trackColor={{ false: "#b9b7b7", true: "#5f6368" }}
                   thumbColor={isEnabled ? "#5f6368" : "#b9b7b7"}
                   ios_backgroundColor="#5f6368"
                   onValueChange={toggleSwitch}
                   value={isEnabled} />  
               </View>
             </View>

        <TouchableOpacity 
          // onPress={ () => navigation.navigate('MyTabs') }
          onPress={ Trylogin }
        >
          <Text style={[styles.p, {textAlign: "center", color: "#cc3939", width:150, alignSelf: "center"}]}>
            <MaterialCommunityIcons name="login" size={22} style={{color:"#cc3939"}} /> Entrar
          </Text>
        </TouchableOpacity>
             </View>
      <View style={{flexWrap: "wrap", flexDirection: "row"}}>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastrar')}  style={{width: "50%"}} >
          <Text style={[styles.p, {fontSize: 15, textAlign: "left"}]}>
          <AntDesign name="profile" size={24}  /> Nova conta
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={esqueciMinhaSenha} style={{width: "50%"}} >
        <Text style={[styles.p, {textAlign: "right", fontSize: 15}]}>
           <Feather name="help-circle" size={24} style={styles.cor} /> Esqueci senha </Text>
    </TouchableOpacity>
      </View>
        </ScrollView>
        }
      </Animated.View>
    </KeyboardAvoidingView>

  );
}