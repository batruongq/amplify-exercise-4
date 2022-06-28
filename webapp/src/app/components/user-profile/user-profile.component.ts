import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  async getS3SignedUrl(): Promise<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = {
      method: 'GET',
      headers,
    };

    const response =
      await fetch(`https://3g6cuj6v71.execute-api.us-east-1.amazonaws.com/dev/assets/presignedUrlUpload`, options);

    const presignedUrl = await response.json();

    return presignedUrl;
  }

  async pushPhotoToS3(presignedUploadUrl: string, file: File): Promise<any> {
    const headers = new Headers({ 'Content-Type': 'image/*' });

    return await fetch(presignedUploadUrl, {
        method: 'PUT',
        headers,
        body: file
    });
  }

  async handleUploadChange(e: any): Promise<void> {
    const data = await this.getS3SignedUrl();

    if (data.url) {
      if (e.target.files) {
        const file = e.target.files[0];
        const result = await this.pushPhotoToS3(data.url, file);
        console.log('LOG ME', result);
      }
    }
  }
}
