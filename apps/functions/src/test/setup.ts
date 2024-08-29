import { app } from '@azure/functions';

app.http = jest.fn();
app.timer = jest.fn();
app.storageQueue = jest.fn();
