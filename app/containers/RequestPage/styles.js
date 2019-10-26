import {StyleSheet} from 'react-native';
/*export const body_button = StyleSheet.create({

});*/
export const styles = StyleSheet.create({
  map: {
    flex: 4,
  },
  detail: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
  alertIcon: {
    width: 50,
  },
  caseDetail: {
    flex: 1,
    marginLeft: 16,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trafficMarker: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    borderWidth: 2,
    backgroundColor: '#fff',
  },
});
