import * as React from 'react';
import * as PropTypes from 'prop-types';
import DatePicker from  'react-datepicker';
import * as Moment from 'moment';

class LocalDatePicker extends React.Component<Props> {
    _dateChanged = (date: Moment.Moment) => {
        this.props.onChange(date);
    }

    render() {
        return (<DatePicker 
                    className={ this.props.className }
                    dateFormat="DD MMM YYYY"
                    selected={ this.props.selectedDate }
                    onChange={this._dateChanged} />);
    }
};

interface Props {
    selectedDate: Moment.Moment,
    className: string,
    onChange: (date: Moment.Moment) => void
}

export default LocalDatePicker;