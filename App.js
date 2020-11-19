import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  TouchableOpacity,
  Alert,
  TextInput,
  Image,
  Navigator,
  Picker,
  Button,
  SafeAreaView, 
  ScrollView
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

const options={
  chooseFromLibraryButtonTitle: 'Choose photo from library',
}
 const createFormData = (image) => {
  const data = new FormData();

  data.append("image", {
  type: 'image/jpeg',
  name: 'image.jpg',
  uri:
      Platform.OS === "android" ? image.uri : image.uri.replace("file://", "")

  });

  return data;
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:'#455a64',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
  signupTextCont : {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
  	color:'rgba(255,255,255,0.6)',
  	fontSize:16
  },
  signupButton: {
  	color:'#ffffff',
  	fontSize:16,
  	fontWeight:'500'
  },
  button: {
    width:300,
    backgroundColor:'#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
   inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },
    logoText : {
  	marginVertical: 15,
  	fontSize:18,
  	color:'rgba(255, 255, 255, 0.7)'
  },
  Label:{
      color:"#9F9696"
  }
});


console.disableYellowBox = true;

export default class App extends Component<{}> {

render() {
    const { image } = this.state
    
		return(
      <SafeAreaView style={styles.container}>
			<View style={styles.container}>
 <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {image && (
            <Image
              source={{ uri: image.uri }}
              style={{ width: 300, height: 300 }}
            />
        )}
        <Button title="Choose Photo" onPress={this.myfun} />
      </View>

       <TouchableOpacity style={styles.button} onPress={this.sendimage}>
          <Text style={styles.buttonText}>compare image</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
)
}

  constructor(props){
    super(props);
    this.state ={image: null};
  }

  sendimage=()=> {
  fetch("http://192.168.1.4:5000/api/compare", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type' : 'multipart/form-data',
    },
    body: createFormData(this.state.image)
})
    .then(response => response.json())
    .then(response => {
            //Handler for the Submit onPress
   alert(response.message);
})
};

  	


    myfun=()=>{
  //alert('clicked');

  ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    else if (response.error) {
      console.log('Image Picker Error: ', response.error);
    }

    else {
      let source = { uri: response.uri };

      // You can also display the image using data:
      // let source = { uri: 'data:image/jpeg;base64,' + response.data };

      this.setState({
        image: source
      });
    }
  });
}



}

