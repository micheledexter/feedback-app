import React, { Component } from 'react';
import '../App/App.css';
import AdminHeader from './AdminHeader/AdminHeader';
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

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackList: [],
    };
  }

  // Send a request to the server for table entries
  getFeedbackResults = () => {
    axios.get('/api/feedback').then(response => {
      this.setState({ // Set the local state to the array of entries
        feedbackList: response.data
      });
    }).catch(error => {
      alert('Error getting feedback from database.');
      console.log(`ERROR trying to GET /api/feedback: ${error}`);
    });
  }

  // Send a request to server to delete entry based on user confirmation
  deleteEntry = id => {
    let confirmation = window.confirm('Are you certain you want to delete this? There\'s no going back! Press \'OK\' to continue');
    if (confirmation) { // If they confirmed the delete, send the request
      const deletion = `/api/feedback/${id}`;
      axios.delete(deletion).then(response => {
        this.getFeedbackResults(); // Repopulate the table
      }).catch(error => {
        alert('Error trying to delete entry');
        console.log(`ERROR trying to DELETE /api/feedback/:id: ${error}`);
      });
    }
  }

  // Load the table entries on component mount
  componentDidMount = () => {
    this.getFeedbackResults();
  }

  // Set entry flag status in the TableRow
  checkFlag = flag => {
    if (flag) return 'flagged-row';
    return 'normal-row';
  }

  // Send a flag status to the server using a toggle
  toggleFlag = (id, flagStatus) => {
    axios.put(`/api/feedback/${id}`, { setStatus: !flagStatus }).then(response => {
      this.getFeedbackResults(); // Repopulate the table
    }).catch(error => {
      alert('Error trying to toggle the flag status');
      console.log(`ERROR trying to PUT /api/feedback/:id: ${error}`);
    });
  }

  render() {
    return (
      <div className="Admin">
        <AdminHeader />
        <br />
        <Paper className="table-view"> {/* Use Paper for styling */}
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
              {/* Map out the table entries in the body by row */}
              {this.state.feedbackList.sort((currentItem, nextItem) => (currentItem.id - nextItem.id)).map((entry, i) =>
                <TableRow key={i} hover={true} className={this.checkFlag(entry.flagged)}>
                  <TableCell>{entry.feeling}</TableCell>
                  <TableCell>{entry.understanding}</TableCell>
                  <TableCell>{entry.support}</TableCell>
                  <TableCell>{entry.comments}</TableCell>
                  <TableCell>
                    {/* Create a button for toggling a flagged entry */}
                    <Button
                      className="flag-entry"
                      variant="fab"
                      mini
                      onClick={() => this.toggleFlag(entry.id, entry.flagged)}>
                      <Flag color="secondary" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    {/* Create a button for deleting an entry */}
                    <Button
                      className="delete-entry"
                      variant="fab"
                      mini
                      onClick={() => this.deleteEntry(entry.id)}>
                      <Delete color="error" />
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

// Just export the Admin component, no need to even connect.
export default Admin;