import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Branch from './Branch';

class Branches extends Component {
    state = {
        branches: []
    };
    componentDidMount() {
        this.fetchBranches();
        
    }
    // Fetch branches api
    fetchBranches = () => {
        const branchApi = 'http://sgn.test/wp-json/wp/v2/branch';
        fetch(branchApi)
            .then(res => res.json())
            .then(branches => {
                branches.map(branch => {
                    let newBranch =  ({
                        id: branch.id,
                        name: branch.title.rendered,
                        description: branch.content.rendered,
                        adress: branch.adress,
                        email: branch.email,
                        whatsApp: branch.whatsapp,
                        facebook: branch.facebook_page,
                        activities: [],
                        activitesApi: branch._links['wp:term'][0].href
                    })
                  
                    this.fetchActivities(newBranch);
        
                    
                    
                });  
            })
    }
    // Fetch Activites for chosen Branch
    fetchActivities = (newBranch) => {
        fetch(newBranch.activitesApi)
            .then(res => res.json())
            .then(activites => {

                newBranch.activities =
                    activites.map(activity => {
                        return {
                            name: activity.name,
                            description: activity.description
                        }
                    })
                this.setState({
                    branches: [...this.state.branches, newBranch]
                })
            })
    }


    render() {
        
        return (
            <div>
                {this.state.branches.map(branch => {
                    return <Branch name={branch.name}
                            description={branch.description}
                    />
                })}
            </div>
        );
    }
}

Branches.propTypes = {

};

export default Branches;