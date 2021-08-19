import Mock from "../mock";

const ListDB = {
  list: [
    {
      id: 1,
      name: "earth",
    },
    {
      id: 2,
      name: "jupiter",
    },
    {
      id: 3,
      name: "mars",
    },
    {
      id: 4,
      name: "mercury",
    },
    {
      id: 5,
      name: "saturn",
    },
    {
      id: 6,
      name: "venus",
    }
  ]
};

Mock.onGet("/api/planet/all").reply(config => {
  const response = ListDB.list;
  return [200, response];
});
