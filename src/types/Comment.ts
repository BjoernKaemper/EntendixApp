/**
 * Comment Interface
 * @interface Comment
 * @property {string} user - The user who made the comment
 * @property {string} body - The body of the comment
 * @property {string} date - The date of the comment
 */

export interface Comment {
  id: string;
  user: string;
  body: string;
  date: string;
}
