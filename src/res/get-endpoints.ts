/**
 * @name GME
 * * Get Method Endpoints
 * (All valid Twitch endpoints that take a GET request)
 *
 * Some of these are aliases for simplicity's sake.
 *
 * @type {Object}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const gme: any = {
  /**
   * @name allStreamTags
   * * Endpoint: tags/streams
   * * Description: Gets the list of all stream tags defined by twitch
   * * Currently limited to first 100 at max, will implement pagination in next version
   * * Required Key: { first: <integer> } max: 100, default: 20
   * * Aliases: ast
   */
  allStreamTags: {
    _endpoint: "tags/streams"
  },

  /**
   * @name channels
   * * Endpoint: channels
   * * Description: Gets channel information for users
   * * Required Key: { broadcaster_id <string> }
   */
  channels: {
    _endpoint: "channels",
    maxData: 1
  },

  /**
   * @name clips
   * * Endpoint: clips
   * * Description: Gets clip information by broadcaster ID ___OR___ game ID
   * * Currently limited to first 100 at max, will implement pagination in next version
   * * Required Keys: { broadcaster_id: \<userid> ___OR___ game_id: \<gameid> }
   * * Optional Keys: { first: <integer> } max: 100, default: 20
   */
  clips: {
    _endpoint: "clips"
  },

  /**
   * @name games
   * * Endpoint: games
   * * Description: Gets game information by game ID and/or name
   * * Required Keys: { id: gameid (and/or) name: string }
   * ! IMPORTANT: name _must be an exact match_, this is a limitation of how the twitch API processes data
   * * Optional Keys: None
   */
  games: {
    _endpoint: "games"
  },

  /**
   * @name topGames
   * * Endpoint: games/top
   * * Description: Gets games sorted by the number of current viewers on Twitch, most popular first.
   * * Currently limited to first 100 at max, will implement pagination in next version
   * * Required Key: { first: integer } max: 100, default: 20
   */
  topGames: {
    _endpoint: "games/top"
  },

  /**
   * @name streams
   * * Endpoint: streams
   * * Description: Gets information about active streams. Streams are returned sorted by number of current viewers, in descending order.
   * * Currently limited to first 100 at max, will implement pagination in next version
   * * Required Key(If not using any of the optional keys): { first: integer } max: 100, default: 20
   * * Optional Keys:
   * ** game_id: <gameid> (you may specify up to 10 IDs.)
   * ** language: <string> (you may specify up to 100 languages.)
   * ** user_id: <userid> (you may specify up to 100 IDs.)
   * ** user_login: <username> (you may specify up to 100 names.)
   */
  streams: {
    _endpoint: "streams"
  },

  /**
   * @name streamTags
   * * Endpoint: streams/tags
   * * Description: Gets the list of tags for a specified stream (channel).
   * * Required Key: { broadcaster_id: <userid> }
   */
  streamTags: {
    _endpoint: "streams/tags"
  },

  /**
   * @name follows
   * * Endpoint: users/follows
   * * Description: Gets information on follow relationships between two Twitch users.
   * * Currently limited to first 100 at max, will implement pagination in next version
   * * Required Keys: { from_id: <userid> and/or to_id: <userid> }
   * * Optional Keys: { first: <integer> } max: 100, default: 20
   */
  follows: {
    _endpoint: "users/follows"
  },

  /**
   * @name users
   * * Endpoint: users
   * * Description: Gets information about one or more specified Twitch users
   * * Required Keys: { id: <userid> and/or login: <username> }
   * * Aliases: user, u
   */
  users: {
    _endpoint: "users"
  },
};
