import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'tab',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'folder/:id',
  //   loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  // },
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  }
  ,
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  }
  // ,
  // {
  //   path: 'pdf-viewer',
  //   loadChildren: () => import('./pages/pdf-viewer/pdf-viewer.module').then( m => m.PdfViewerPageModule)
  // }
  // ,
  // {
  //   path: 'photo-viewer',
  //   loadChildren: () => import('./pages/photo-viewer/photo-viewer.module').then( m => m.PhotoViewerPageModule)
  // }
  // ,
  // {
  //   path: 'view-articles',
  //   loadChildren: () => import('./pages/view-articles/view-articles.module').then( m => m.ViewArticlesPageModule)
  // },
  // {
  //   path: 'gallery',
  //   loadChildren: () => import('./pages/gallery/gallery.module').then( m => m.GalleryPageModule)
  // },
  // {
  //   path: 'committee-members',
  //   loadChildren: () => import('./pages/committee-members/committee-members.module').then( m => m.CommitteeMembersPageModule)
  // },
  // {
  //   path: 'members',
  //   loadChildren: () => import('./pages/members/members.module').then( m => m.MembersPageModule)
  // },
  // {
  //   path: 'profile',
  //   loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  // }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
