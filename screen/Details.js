import {useEffect, useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  
} from 'react-native';
import { useRoute } from '@react-navigation/native';

import response from "../data";


function Details(){
  const route = useRoute();
  const [data,setData] = useState();

  useEffect(()=>{
    setData(response.filter((item) => item.consultationStatus !== route.params.selected));
  },[]);

  console.log(data,"dfdf");

  



  return (
    <FlatList
      data={data}
      renderItem={({ item,index }) => (
        <View
        style={{
          width: '95%',

          borderRadius: 10,
          borderWidth: 0.5,
          alignSelf: 'center',
          marginTop: 20,
          marginBottom: index == data.length - 1 ? 20 : 0,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Image
          source={{ uri: item.photoPath }}
          style={{
            width: 80,
            height: '90%',
            marginLeft: 10,
            borderRadius: 10,
          }}
        />
        <View style={{ width: '80%' }}>
          <Text
            style={{ fontWeight: '600', marginLeft: 10, marginTop: 10 }}>
            {item.doctorName}
          </Text>
          <Text style={{ fontSize: 12, margin: 10 }}>
            {`Specialty-  ${item.specialization}`}
          </Text>
          <Text style={{ fontSize: 12, margin: 10 }}>
            {`Consultation type-  ${item.consultationType}`}
          </Text>
          <Text style={{ fontSize: 12, margin: 10 }}>
            {`clinic name-  ${item.clinicName}`}
          </Text>
          {
            item.consultationType === 'PHYSICAL' && (
              <Text
                style={{
                  fontSize: 18,
                  marginLeft: 10,
                  fontWeight: '800',
                  color: 'green',
                }}>

                {`Address- ${item.clinicAddress}`}
              </Text>
            )
          }
<Text style={{ fontSize: 12, margin: 10 }}>
            {`SlotDate-  ${item.slotDate}`}
          </Text>


          <View
            style={{
              flexDirection: 'row',
              justifyContent:'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                marginLeft: 10,
                fontWeight: '800',
                color: 'orange',
              }}>

              {'Start -' + item.slotStartTime}
            </Text>

            <Text
              style={{
                fontSize: 16,
                marginRight: 30,
                fontWeight: '800',
                color: 'orange',
                marginLeft:2
              }}>
              {'End -' + item.slotEndTime}
            </Text>

          </View>
        </View>
      </View>
      )}
      numColumns={1}
    />
    
  );
};

const styles = StyleSheet.create({
 
});

export default Details;
