export const userActivityLogArray = [
  {
    id: 66,
    userId: 'test-23d3-4e6b-a36e-c234065b411b',
    sessionIdentifier: '218b3d6376aea841638482a93189d573',
    eventStartTime: new Date('2024-04-13T09:23:52.739Z'),
    eventEndTime: new Date('2024-04-13T09:23:55.285Z'),
    eventDuration: 64,
    eventParam: null,
    eventUrl: '/',
    createdAt: new Date('2024-04-13T09:23:55.287Z'),
    updatedAt: new Date('2024-04-13T09:23:55.287Z')
  },
  {
    id: 65,
    userId: 'test-23d3-4e6b-a36e-c234065b411b',
    sessionIdentifier: 'adf043380ec9f4f34ced5e62fb5af981',
    eventStartTime: new Date('2024-04-11T20:52:34.897Z'),
    eventEndTime: new Date('2024-04-11T20:52:46.413Z'),
    eventDuration: 715,
    eventParam: null,
    eventUrl: '/contact',
    createdAt: new Date('2024-04-11T20:52:46.419Z'),
    updatedAt: new Date('2024-04-11T20:52:46.419Z')
  },
  {
    id: 64,
    userId: 'test-23d3-4e6b-a36e-c234065b411b',
    sessionIdentifier: 'adf043380ec9f4f34ced5e62fb5af981',
    eventStartTime: new Date('2024-04-11T20:52:34.897Z'),
    eventEndTime: new Date('2024-04-11T20:52:46.140Z'),
    eventDuration: 684,
    eventParam: null,
    eventUrl: '/faq',
    createdAt: new Date('2024-04-11T20:52:46.141Z'),
    updatedAt: new Date('2024-04-11T20:52:46.141Z')
  }
];

export const userActivityLogAggByEventUrl = [
  {
    _sum: {
      eventDuration: 1318993
    },
    eventUrl: '/'
  },
  {
    _sum: {
      eventDuration: 38644
    },
    eventUrl: '/faq'
  }
];

export const userActivityLogAggByUserId = [
  {
    _sum: {
      eventDuration: 2153920
    },
    userId: '1test-23d3-4e6b-a36e-c234065b411b'
  },
  {
    _sum: {
      eventDuration: 112741
    },
    userId: '2test-acf5-4b6f-9008-1d31be5c50da'
  }
];

export const uniqueUserIdEmailArray = [
  {
    id: 'test-23d3-4e6b-a36e-c234065b411b',
    loginEmail: 'hanli@kpmg.co.nz'
  }
];
