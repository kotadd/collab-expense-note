const DATA = {
  groups: [
    {
      id: 'zm94uPcfS1By2fA9YHlV',
      accountID: '4adiQEAw9u9D1LK0elPA',
      name: 'knishinaの家族',
      _createdAt: 123456780,
      _updatedAt: 123456780
    },
    {
      id: 1,
      accountID: '4adiQEAw9u9D1LK0elPA',
      name: 'その他の家族',
      _createdAt: 123456780,
      _updatedAt: 123456780
    }
  ],
  users: [
    {
      id: 'CFCXS8EMaIMoTjoclEYx',
      accountID: '4adiQEAw9u9D1LK0elPA',
      groupID: 'zm94uPcfS1By2fA9YHlV',
      name: 'knishina',
      email: 'knishina@test.com',
      _createdAt: 123456780,
      _updatedAt: 123456780
    },
    {
      id: 'v75pXsfDa8brOdYsUEAT',
      accountID: '4adiQEAw9u9D1LK0elPA',
      groupID: 'zm94uPcfS1By2fA9YHlV',
      name: 'ynishina',
      email: 'ynishina@test.com',
      _createdAt: 123456780,
      _updatedAt: 123456780
    }
  ],
  accounts: [
    {
      id: '4adiQEAw9u9D1LK0elPA',
      payments: [
        {
          id: 0,
          date: '2020-01-04',
          groupID: 'zm94uPcfS1By2fA9YHlV',
          groupAmount: '831',
          shopName: 'セブンイレブン',
          userID: 'CFCXS8EMaIMoTjoclEYx',
          userAmount: '831',
          _createdAt: 123456780,
          _updatedAt: 123456780
        },
        {
          id: 1,
          date: '2020-01-02',
          groupID: 'zm94uPcfS1By2fA9YHlV',
          groupAmount: '5221',
          shopName: 'スギ薬局',
          userID: 'v75pXsfDa8brOdYsUEAT',
          userAmount: '3000',
          _createdAt: 123456780,
          _updatedAt: 123456780
        }
      ]
    }
  ]
};

export default DATA;
