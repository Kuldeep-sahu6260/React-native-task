import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import response from "../data";

const Main = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState('All Consultations');
  const [data, setData] = useState(response);

  function onValueChange(value) {
    setSelected(value);
    navigation.navigate('Details', { selected: value })
  }


  function EConsultation() {


    const temp = response.filter((item) => item.consultationType === 'PHONE_CALL' || item.consultationType === 'VIDEO_CALL');

    setData(temp);
  }

  function PConsultation() {


    const temp = response.filter((item) => item.consultationType === 'PHYSICAL');

    setData(temp);
  }

  return (
    <View style={styles.container}>
      <Picker

        style={{ width: "80%" }}
        selectedValue={selected}
        onValueChange={onValueChange}>
        <Picker.Item label="All Consultations" value="All Consultations" />
        <Picker.Item label="Upcoming" value="Upcoming" />
        <Picker.Item label="Prescription Pending" value="Prescription Pending" />
        <Picker.Item label="Completed" value="Completed" />
        <Picker.Item label="Canceled" value="Canceled" />

      </Picker>

      <View style={{ display: 'flex', flexDirection: "row", justifyContent: "space-between", marginBottom: 3 }}>
        <Pressable onPress={EConsultation} style={styles.button}>
          <Text style={styles.buttonText}>E-Consultation</Text>
        </Pressable>
        <Pressable onPress={PConsultation} style={styles.button1}>
          <Text style={styles.buttonText}>P-Consultation</Text>
        </Pressable>
      </View>
      <View style={{ flex: 1 }}>

        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
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
            );
          }}
        />

      </View>
    </View>



  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "black",
    alignItems: 'center',
  },
  button: {

    backgroundColor: 'red',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 50,
    alignItems: 'center',
  },
  button1: {

    backgroundColor: 'green',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },

});

export default Main;
