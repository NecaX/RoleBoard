import React from 'react';
import './CampaignDashboard.css';
import SortableMaterialList from '../components/SortableMaterialList';
import arrayMove from 'array-move';
import DragIndicator from '@material-ui/icons/DragIndicator'
import Info from '@material-ui/icons/Info'
import Send from '@material-ui/icons/Send'
import GreenFab from '../components/GreenFab'


class CampaignDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.findNextChapter = this.findNextChapter.bind(this)
    this.state = {

      id: this.props.match.params.id,
      title: 'The fall of the Knights Radiant',
      world: 'Roshar',
      summary: 'The Knights Radiant have been acting as the police of Roshar for hundreds of years. They have kept the peace and fought against the appearing threats. However, a new foe appeared on the Shattered Plains. The Parshendi are attacking the people with increasing fierceness, and they have declared war on everyone holding a Shardblade.',
      recent: 'The heroes have found a Shardblade next to the corpse of a Knight Radiant. But when they picked it up, it appeared to have a limitation, it could not be summoned until after ten heartbeats. Now, they have to find out what is limiting the power of the Blade',
      chapters: [
        {
          title: 'The escape from the Shattered Plains',
          done: true,
        },
        {
          title: 'Entering Urithuru',
          done: true,
        },
        {
          title: 'The rescue of a Knight Radiant',
          done: true,
        },
        {
          title: 'The true story behind Shardblades',
          done: false,
        },
        {
          title: 'Finding a Shardplate',
          done: false,
        }
      ]
      ,
      players: [
        {
          name: 'Neabriks',
          user: 'user1'
        },
        {
          name: 'Jatist',
          user: 'user2'
        },
        {
          name: 'Tsokv',
          user: 'user3'
        },
        {
          name: 'Vakiat',
          user: 'user4'
        }
      ],
      nextChapter: 0,
      items: ['one', 'two', 'three', 'four'],
    }
  }

  componentDidMount() {
    this.setState({
      nextChapter: this.findNextChapter()
    })
  }

  findNextChapter() {
    for (var i = 0; i < this.state.chapters.length; i++) {
      if (!this.state.chapters[i].done) {
        return i
      }
    }
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ chapters }) => ({
      chapters: arrayMove(chapters, oldIndex, newIndex),
    }));

    console.log(this.state.chapters)
  };

  displayChapters(value, index) {
    var col = value.done ? 'white' : ''
    return (
      <tr>
        <td className='luminari-text' style={{ flexGrow: 8 }}>
          <DragIndicator style={{ color: col, paddingRight: '10px' }} />
          Chapter {index + 1}: {value.title} {value.done ? ' - finished' : ''}
        </td>
        <td className='luminari-text' style={{ flexGrow: 1 }}>
          <Info style={{ color: 'rgba(0,0,0,0.4)' }} />
        </td>
      </tr>
    )
  }

  renderPlayers() {
    return this.state.players.map((player, index) => {
      return (
        <tr>
          <td style={{ flexGrow: 3 }}>
            {player.name}
          </td>
          <td style={{ flexGrow: 2 }}>
            {player.user}
          </td>
          <td style={{ flexGrow: 1 }}>
            <Info style={{ color: 'rgba(0,0,0,0.4)' }} />
          </td>
        </tr>
      )
    })
  }

  render() {

    return (

      <div className="campaign-dashboard-container">
        
        <div className="campaign-dashboard-data">
          <div className="campaign-dashboard-info">
            <div className="campaign-dashboard-card campaign-dashboard-title material-shadow">
              {this.state.title} - {this.state.world}
            </div>
            <div className="campaign-dashboard-card campaign-dashboard-summary material-shadow">
              {this.state.summary}
            </div>
            <div className="campaign-dashboard-card campaign-dashboard-summary material-shadow">
              {this.state.recent}
            </div>
          </div>

          <div className="campaign-dashboard-lists">
            <div className="material-table campaign-dashboard-chapters material-shadow">
              <tbody className="scroll">
                <SortableMaterialList items={this.state.chapters} onSortEnd={this.onSortEnd} display={this.displayChapters} />
              </tbody>
            </div>
            <div className="material-table campaign-dashboard-players material-shadow">
              <tbody className="scroll">
                {this.renderPlayers()}
              </tbody>
            </div>
          </div>
        </div>

        <div className="campaign-dashboard-footer">
          <div className="campaign-dashboard-card campaign-dashboard-next material-shadow">
            Next - Chapter {this.state.nextChapter + 1}: {this.state.chapters[this.state.nextChapter].title}
          </div>
          <div className="campaign-dashboard-button">
          <GreenFab  variant="extended" onClick={this.handleClick}>
            <div>Prepare</div>
            <Send style={{ paddingLeft: 10 }} />
          </GreenFab>
          </div>

        </div>
      </div>
    )
  }
}

export default CampaignDashboard;
