import React, { Component } from 'react';
import './App.css';
import teams from './teams.json';
import Wrapper from './components/Wrapper';
import Navpills from './components/Nav';
import Title from './components/Title';
import Card from './components/Card';

class App extends Component {
    state = {
        message: "Click an image to begin!",
        topScore: 0,
        curScore: 0,
        teams: teams,
        unselectedTeams: teams
    }

    componentDidMount() {
    }

    shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    selectTeam = name => {
        const findTeam = this.state.unselectedTeams.find(item => item.name === name);

        if(findTeam === undefined) {
            this.setState({ 
                message: "You guessed incorrectly!",
                topScore: (this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
                curScore: 0,
                teams: teams,
                unselectedTeams: teams
            });
        }
        else {
            const newTeams = this.state.unselectedTeams.filter(item => item.name !== name);
            
            this.setState({ 
                message: "You guessed correctly!",
                curScore: this.state.curScore + 1,
                temas: teams,
                unselectedTeams: newTeams
            });
        }

        this.shuffleArray(teams);
    };

    render() {
        return (
            <Wrapper>
                <Navpills
                    message={this.state.message}
                    curScore={this.state.curScore}
                    topScore={this.state.topScore}
                />
                <Title />
                {
                    this.state.teams.map(team => (
                        <Card
                            name={team.name}
                            image={team.image}
                            selectTeam={this.selectTeam} 
                            curScore={this.state.curScore}
                        />
                    ))
                }
            </Wrapper>
        );
    }
}

export default App;
