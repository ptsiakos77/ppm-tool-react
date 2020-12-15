import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchTask, getAllDBTasks } from '../../actions/taskActions'

class SearchTaskBar extends Component {

  constructor() {
    super()
    this.state = {
      searchTerm: "",
      tasks: []
    }
    this.onChange = this.onChange.bind(this)
    this.onClearSearch = this.onClearSearch.bind(this)

  }

  onChange(e) {
    const searchTerm = e.target.value
    this.props.searchTask(searchTerm)
  }

  onClearSearch() {
    document.getElementById('search').value = ''
    this.setState({ searchTerm: '' })
    this.props.getAllDBTasks()
  }

  render() {
    return (
      <div>
        <nav>
          <div class="nav-wrapper teal lighten-2">
            <form>
              <div class="input-field">
                <input id="search" type="search" required onChange={this.onChange} />
                <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                <i onClick={this.onClearSearch} class="material-icons">close</i>
              </div>
            </form>
          </div>
        </nav>
      </div>
    )
  }
}
export default connect(null, { searchTask, getAllDBTasks })(SearchTaskBar)