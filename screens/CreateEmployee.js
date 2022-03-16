// package imports
import React,{useState} from 'react'
import { StyleSheet, View } from 'react-native';
import Modal from "react-native-modal";
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

const CreateEmployee = () => {

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [salary, setSalary] = useState("")
    const [image, setImage] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
      };    

      const pickFromGallary = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: true
        });
    
        console.log("result", result);
        if(!result.cancelled){
            const { uri } = result
                handleUpload(uri)
            }
      };

      const pickFromCamera = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: true
        });
    
        console.log(result);  //dwqugq73t <- cloud name
        if(!result.cancelled){
        const { uri } = result
            handleUpload(uri)
        }
      };

      const handleUpload = (uri)=>{
        const data = new FormData()
        const uriArr = uri.split('.');
        const fileType = uriArr[uriArr.length - 1]
        const file = `data:${fileType}`
        data.append('file',file)
        data.append('upload_preset','employeeApp')
        data.append("cloud_name","dwqugq73t")
        fetch("https://api.cloudinary.com/v1_1/dwqugq73t/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json()).
        then(data=>{
            console.log("data",data)
            setImage(data.url)
            setModalVisible(!isModalVisible);
        }).catch(err=>{
           console.log(err)
        })
   } 

    return(
        <View style={styles.root}>
            <TextInput
                style={styles.inputStyle}
                label="Name"
                value={name}
                theme={theme}
                mode="outlined"
                onChangeText={text => setName(text)}
            />
            <TextInput
                style={styles.inputStyle}
                label="Email"
                value={email}
                theme={theme}
                mode="outlined"
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                style={styles.inputStyle}
                label="phone"
                value={phone}
                theme={theme}
                keyboardType="number-pad"
                mode="outlined"
                onChangeText={text => setPhone(text)}
            />
            <TextInput
                style={styles.inputStyle}
                label="salary"
                value={salary}
                theme={theme}
                mode="outlined"
                onChangeText={text => setSalary(text)}
            />
            <Button theme={theme} style={styles.inputStyle} icon={image === null ? 'upload' : 'check'} mode="contained" onPress={toggleModal} >
                Upload Image
            </Button>
            <Button theme={theme} style={styles.inputStyle} icon="content-save" mode="contained" onPress={() => console.log("save") }>
                Save
            </Button>         
            <Modal isVisible={isModalVisible} >
            <View style={styles.modalView}>
                <View style={styles.modalButtonView}>
                    <Button theme={theme} icon="camera" mode="contained" onPress={pickFromCamera}>
                        Camera
                    </Button>
                    <Button theme={theme} icon="image-area" mode="contained" onPress={pickFromGallary}>
                        Gallary
                    </Button>
                    {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
                </View>
                <Button theme={theme} onPress={toggleModal}>
                        Cancel
                </Button>
            </View>
            </Modal>
        </View>
    )
}

const theme = {
    colors:{
        primary:"#006aff"
    }
}

const styles = StyleSheet.create({
    root:{
        flex:1
    },
    inputStyle:{
        margin:5 
    },
    modalButtonView:{
        flexDirection:"row",
        justifyContent:"space-around",
        padding:10
    },
    modalView:{
        position:"absolute",
        bottom:2,
        width:"100%",
        backgroundColor:"white"
    }
})

export default CreateEmployee