import { resolve } from '$app/paths';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const token = String(data.get('token') || '');

    if (!token) return fail(400, { error: 'Invalid credentials' });
    cookies.set('token', token, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: false
    });

    throw redirect(303, resolve("/", {}));
  }
};