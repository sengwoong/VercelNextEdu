
import {   createUser } from '@/service/posts';

import { NextResponse, NextRequest } from 'next/server';


export async function POST(req: NextRequest) {

    const form = await req.formData();
    const Username = form.get('Username')?.toString();
    const Name = form.get('Name')?.toString();
    const Email = form.get('Email')?.toString();
    const Image = form.get('Image') as Blob;

    if (!Name || !Image || !Username || !Email) {
      return new Response('Bad Request', { status: 400 });
    }
    

    return createUser(Username, Name, Email,Image) //
      .then((data) => NextResponse.json(data));

}
