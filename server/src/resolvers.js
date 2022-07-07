const resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate the homepage grid of our web client
    tracksForHome: (_, __, { dataSources }) => {
      return dataSources.trackAPI2.getTracksForHome();
    },

    // get a single track by ID, for the track page
    track: (_, { id }, { dataSources }) => {
      return dataSources.trackAPI2.getTrack(id);
    },

    // get a single module by ID, for the module detail page
    module: (_, { id }, { dataSources }) => {
      return dataSources.trackAPI2.getModule(id);
    },
  },
  Mutation: {
    // increments a track's numberOfViews property
    incrementTrackViews: async (_, { id }, { dataSources }) => {
      try {
        const track = await dataSources.trackAPI2.incrementTrackViews(id);
        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of views for track ${id}`,
          track,
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          track: null,
        };
      }
    },
  },
  Track: {
    author: ({ authorId }, _, { dataSources }) => {
      return dataSources.trackAPI2.getAuthor(authorId);
    },

    modules: ({ id }, _, { dataSources }) => {
      return dataSources.trackAPI2.getTrackModules(id);
    },
  },
};

module.exports = resolvers;
