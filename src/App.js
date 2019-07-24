import React, { useState } from 'react';
import NotificationForm from './NotificationForm';
import ProgressIndicator from './ProgressIndicator';
import ListDevices from "./ListDevices";

const App = props => {
  const [notificationState, setNotificationState] = useState({
    title: '',
    subtitle: ''
  });

  const [loadingState, setLoadingState] = useState({
    isLoading: false
  });

  const _resetFields = () => {
    setNotificationState({
      title: '',
      subtitle: ''
    });
  }

  const _handleTitleChange = (e) => {
    setNotificationState({
      title: e.target.value,
      subtitle: notificationState.subtitle
    });
  }

  const _handleSubtitleChange = (e) => {
    setNotificationState({
      title: notificationState.title,
      subtitle: e.target.value
    });
  }

  const _handleSend = (e) => {
    // e.preventDefault();
    setLoadingState({
      isLoading: true
    });

    var data = {
      app_id: `${process.env.REACT_APP_APP_ID}`,
      headings: { "en": notificationState.title },
      contents: { "en": notificationState.subtitle },
      included_segments: ["All"]
    };

    var headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": `Basic ${process.env.REACT_APP_REST_API_KEY}`
    };

    var options = {
      host: "onesignal.com",
      port: 443,
      path: "/api/v1/notifications",
      method: "POST",
      headers: headers
    };

    var https = require('https');
    var req = https.request(options, function (res) {
      res.on('data', function (data) {
        console.log(JSON.parse(data))
        _resetFields();
        setLoadingState({
          isLoading: false
        });
      });
    });

    req.on('error', function (e) {
      console.log(e)
      setLoadingState({
        isLoading: false
      });
    });
    req.on('close', function (e) {
      console.log(e)
      setLoadingState({
        isLoading: false
      });
    });

    req.write(JSON.stringify(data));
    req.end();
  }

  return loadingState.isLoading
    ? <ProgressIndicator />
    : <div style={{ display: "flex" }}>
      <NotificationForm
        titleChange={_handleTitleChange}
        subtitleChange={_handleSubtitleChange}
        click={_handleSend}
      />
      <ListDevices />
    </div>
}

export default App;