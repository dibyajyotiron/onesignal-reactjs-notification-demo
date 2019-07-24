import React, { Component } from "react";

import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from "axios";

class ListDevice extends Component {
    state = {
        totalCount: 0,
        players: []
    }

    classes = makeStyles(theme => ({
        button: {
            margin: theme.spacing(1),
        },
        rightIcon: {
            marginLeft: theme.spacing(1),
        },
        root: {
            flexGrow: 1,
        },
        card: {
            maxWidth: 345,
        },
    }));

    async componentDidMount() {
        const data = (await axios.get(`https://onesignal.com/api/v1/players?app_id=${process.env.REACT_APP_APP_ID}`, { headers: this.headers })).data;
        this.setState({ totalCount: data.total_count, players: data.players });
    };
    headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": `Basic ${process.env.REACT_APP_REST_API_KEY}`
    };

    render() {

        return (<>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h4" component="h2">Total subscribers: {this.state.totalCount}</Typography>
                    <Typography variant="body2" color="textPrimary" component="p">
                        {this.state.players.map(el => <div style={{ border: "2px solid gray" }} key={el.id}>
                            <p>ip:{el.ip}</p>
                            <p>deviceType:{el.device_type}</p>
                            <p>os:{el.device_os}</p>
                            <br />
                        </div>)}
                    </Typography>

                </CardContent>
            </CardActionArea>
            <CardActions>
            </CardActions>
        </>)
    }
}

export default ListDevice;