import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  bgImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    backgroundColor: 'rgba(100,100,100,0.8)',
    paddingHorizontal: 40,
    paddingVertical: 30,
    borderRadius: 20,
  },
  formLbl: {
    color: 'white',
    marginBottom: 5,
  },
  formInp: {
    backgroundColor: 'white',
    width: Dimensions.get('screen').width * 0.6,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  btn: {
    width: Dimensions.get('screen').width * 0.6,
    backgroundColor: '#4b84e5',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
  btnTxt: {
    color: 'white',
  },
  linkContainer: {
    marginTop: 15,
    marginBottom: 15,
    flexDirection: 'row',
  },
  linkTxt: {
    color: 'white',
    paddingRight: 5,
  },
  link: {
    color: 'white',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  linkContainerColumn: {
    marginTop: 15,
    marginBottom: 15,
    flexDirection: 'column',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  btnText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
});
