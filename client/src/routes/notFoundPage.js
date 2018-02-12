import React from 'react';
import { Link } from 'react-router-dom';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';

export class NotFoundPage extends React.Component {

  render() {

    return (
      <div>
        <Card className="login-form">
          <CardHeader title="Not Found">
          </CardHeader>
          <CardContent>
            <p>The page you are trying to find does not exist anymore.</p>
          </CardContent>
          <CardActions>
            <div className="flex-fill"/>
            <Button size="small"
                    to='/'
                    component={Link}>To Main Page</Button>
            <div className="flex-fill"/>
          </CardActions>
        </Card>

      </div>
    );
  }
}
