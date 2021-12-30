import React, { useEffect, useState } from 'react';
import {
  View,
  PermissionsAndroid,
  StatusBar,
  FlatList,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';

import contacts from 'react-native-contacts';

import { styles } from './styles';

function App() {
  const [listOfContacts, setListOfContacts] = useState({});

  async function getContacts() {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    );

    if (result === 'granted') {
      const contactsList = await contacts.getAll();

      let letters = {};

      for (let contact of contactsList) {
        const firstLetter = contact.givenName[0].toLocaleLowerCase();

        if (letters?.[firstLetter]) {
          letters[firstLetter].contacts.push(contact);
        } else {
          letters[firstLetter] = {
            contacts: [contact],
            animation: new Animated.Value(0),
          };
        }
      }

      setListOfContacts(letters);
    }
  }

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        animated
        backgroundColor={'rgba(255,255,255, 0)'}
        barStyle="dark-content"
        showHideTransition="fade"
        translucent
      />
      <FlatList
        style={styles.list}
        data={[
          { componentRN: () => <Text style={styles.h1}>Meus contatos</Text> },
          ...Object.keys(listOfContacts).sort((a, b) => a > b),
        ]}
        keyExtractor={item => item}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          if (item?.componentRN) {
            return item.componentRN();
          }
          const animation = listOfContacts[item]?.animation;

          Animated.timing(animation, {
            duration: 800,
            useNativeDriver: false,
            delay: (index + 1) * 50,
            toValue: index,
          }).start();

          return (
            <Animated.View
              style={[
                styles.section,
                {
                  opacity: animation.interpolate({
                    inputRange: [index - 2, index - 1, index, index + 1],
                    outputRange: [0.1, 0.1, 1, 1],
                  }),
                  transform: [
                    {
                      translateX: animation.interpolate({
                        inputRange: [index - 2, index - 1, index, index + 1],
                        outputRange: [-100, -100, 0, 0],
                      }),
                    },
                  ],
                },
              ]}>
              <Text style={styles.title}>{item}</Text>
              <View style={styles.contacts}>
                {listOfContacts[item].contacts.map(contact => {
                  async function onPress() {
                    await contacts.openExistingContact(contact);
                  }

                  const phone = contact.phoneNumbers?.[0]?.number;
                  return (
                    <TouchableOpacity
                      onPress={onPress}
                      key={contact.recordID}
                      activeOpacity={0.8}
                      style={styles.contact}>
                      <Text style={styles.icon}>{item}</Text>
                      <View style={styles.information}>
                        <Text style={styles.name} numberOfLines={1}>
                          {contact.givenName}
                        </Text>
                        <Text>{phone}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
}

export default App;
