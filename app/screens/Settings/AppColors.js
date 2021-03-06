import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import TableView from 'react-native-tableview';
import ReactNativeHaptic from 'react-native-haptic';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

import config from '../../config/default';
import commonStyles from '../../styles/common';
import { capitalize } from '../../helpers/utils';
import CustomText from '../../components/CustomText';
import Circles from '../../components/Settings/Circles';

const { Section, Item, Cell } = TableView;

class AppColors extends React.Component {
  constructor(props) {
    super(props);
  }

  appColorThemeChanged = (color) => {
    ReactNativeHaptic.generate('selection')
    this.props.changeSetting(
      'appColor',
      color
    );
  };

  render() {
    const appColor = this.props.settings.appColor
    return (
      <View style={commonStyles.flex}>
        <TableView 
          style={commonStyles.flex}
          textColor='black'
          tableViewStyle={TableView.Consts.Style.Grouped} 
          tableViewCellStyle={TableView.Consts.CellStyle.Value1}>
          <Section label='Themes'>
            {Object.keys(config.appColors).map(key =>
              <Cell 
                key={key}
                style={styles.cell} 
                accessoryType={appColor == config.appColors[key] ? TableView.Consts.AccessoryType.Checkmark : ''}
                onPress={() => this.appColorThemeChanged(config.appColors[key])}>
                <CustomText style={{fontSize: 17}}>{capitalize(key)}</CustomText>
                <Circles data={[config.appColors[key]]} />
              </Cell>
            )}
          </Section>
        </TableView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cell: {
    flexDirection: 'row',
    height: 44,
    paddingLeft: 15,
    marginRight: 28,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => ({
  settings: state.settings,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppColors);
