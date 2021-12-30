import { StyleSheet, StatusBar } from 'react-native';

const colors = {
  blue: '#5487ff',
  whiteOpacity: 'rgb(240,240,255)',
  white: '#ffffff',
  gray: '#454a54',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  h1: {
    fontSize: 30,
    width: '95%',
    alignSelf: 'center',
    color: colors.gray,
    fontWeight: '700',
    marginBottom: StatusBar.currentHeight * 2,
    paddingTop: StatusBar.currentHeight * 2,
  },
  list: {
    width: '95%',
    alignSelf: 'center',
  },
  section: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  title: {
    color: colors.blue,
    fontSize: 25,
    fontWeight: '700',
    width: 25,
    textTransform: 'uppercase',
  },
  contacts: {
    flex: 1,
    marginLeft: 10,
  },
  contact: {
    borderRadius: 10,
    backgroundColor: colors.whiteOpacity,
    padding: 10,
    marginBottom: 20,
    flexDirection: 'row',
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.blue,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: colors.white,
    fontSize: 18,
    textTransform: 'uppercase',
  },
  information: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 15,
    color: colors.gray,
    paddingRight: 8,
  },
});
