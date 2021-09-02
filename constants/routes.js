
// outsource dependencies


// local dependencies
import { defineRoute, ANNOTATION } from '../services/route';

export const LAYOUT_PUBLIC = '/public';
export const LAYOUT_PRIVATE = '/private';

/*-------------------------------------------------
        LAYOUT_PUBLIC nested routes
---------------------------------------------------*/
export const SIGN_IN = defineRoute(`${LAYOUT_PUBLIC}/sign-in`);
export const SIGN_UP = defineRoute(`${LAYOUT_PUBLIC}/sign-up`);
export const FORGOT_PASSWORD = defineRoute(`${LAYOUT_PUBLIC}/forgot-password`);
export const CHANGE_PASSWORD = defineRoute(`${LAYOUT_PUBLIC}/change-password/:token`, {
  params: [ANNOTATION.TOKEN({})]
});
export const EMAIL_CONFIRMATION = defineRoute(`${LAYOUT_PUBLIC}/email-confirmation/:token`, {
  params: [ANNOTATION.TOKEN({})]
});

/*-------------------------------------------------
        LAYOUT_PRIVATE nested routes
---------------------------------------------------*/
export const WELCOME_SCREEN = defineRoute(`${LAYOUT_PRIVATE}/welcome`);

export const USERS = defineRoute(`${LAYOUT_PRIVATE}/users`);
export const USERS_EDIT = defineRoute(`${USERS.ROUTE}/edit/:id`, {
  params: [ANNOTATION.ID()],
});
