import React, { Component } from 'react';
import '../App/App.css';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Delete from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Flag from '@material-ui/icons/Flag';
import { connect } from 'react-redux';

const mapReduxStateToProps = (reduxState) => (
  { reduxState }
);

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackList: [],
    };
  }

  getFeedbackResults = () => {
    axios.get('/api/feedback').then(response => {
      this.setState({
        feedbackList: response.data
      });
    }).catch(error => {
      alert('Error getting feedback from database.');
      console.log(`ERROR trying to GET /api/feedback: ${error}`);
    });
  }

  deleteEntry = (id) => {
    let confirmation = window.confirm('Are you certain you want to delete this? There\'s no going back! Press \'OK\' to continue');
    if (confirmation) {
      const deletion = `/api/feedback/${id}`;
      axios.delete(deletion).then(response => {
        this.getFeedbackResults();
      }).catch(error => {
        alert('Error trying to delete entry');
        console.log(`ERROR trying to DELETE /api/feedback/:id: ${error}`);
      });
    }
  }

  componentDidMount = () => {
    this.getFeedbackResults();
  }

  checkFlag = flag => {
    if (flag) return 'flagged-row';
    return 'normal-row';
  }

  toggleFlag = (id, flagStatus) => {
    axios.put(`/api/feedback/${id}`, {setStatus: !flagStatus}).then(response => {
      this.getFeedbackResults();
    }).catch(error => {
      alert('Error trying to toggle the flag status');
      console.log(`ERROR trying to PUT /api/feedback/:id: ${error}`);
    });
  }

  render() {
    return (
      <div className="Admin">
        <br />
        <Paper className="table-view">
          <Table>
            <TableHead className="TableHead">
              <TableRow>
                <TableCell>Feeling</TableCell>
                <TableCell>Comprehension</TableCell>
                <TableCell>Support</TableCell>
                <TableCell>Comments</TableCell>
                <TableCell>Flag</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="TableBody">
              {this.state.feedbackList.sort((a, b) => (a.id - b.id)).map((entry, i) => 
                <TableRow id={i} key={i} hover={true} className={this.checkFlag(entry.flagged)}>
                  <TableCell>{entry.feeling}</TableCell>
                  <TableCell>{entry.understanding}</TableCell>
                  <TableCell>{entry.support}</TableCell>
                  <TableCell>{entry.comments}</TableCell>
                  <TableCell><Button className="flag-entry" variant="fab" mini onClick={() => this.toggleFlag(entry.id, entry.flagged)}><Flag color="secondary" /></Button></TableCell>
                  <TableCell><Button className="delete-entry" variant="fab" mini onClick={() => this.deleteEntry(entry.id)}><Delete color="error" /></Button></TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

export default connect(mapReduxStateToProps)(Admin);