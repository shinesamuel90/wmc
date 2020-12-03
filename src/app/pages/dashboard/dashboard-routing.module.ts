import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './dashboard.page';
import { AlbumDataResolverService } from 'src/app/resolver/album-data-resolver.service';
import { ProfileDataService } from 'src/app/resolver/profile-data.service';

const routes: Routes = [
  {
    path: 'tabs',
    component: DashboardPage,
    children: [
      {
      path: 'view-articles',
        loadChildren: () => import('../view-articles/view-articles.module').then( m => m.ViewArticlesPageModule)
      },
      {
        path: 'gallery',
        loadChildren: () => import('../gallery/gallery.module').then( m => m.GalleryPageModule)
      },
      {
        path: 'committee-members',
        loadChildren: () => import('../committee-members/committee-members.module').then( m => m.CommitteeMembersPageModule)
      },
      {
        path: 'global-committee-members',
        loadChildren: () => import('../global-committee-members/global-committee-members.module').then( m => m.GlobalCommitteeMembersPageModule)
      },
      {
        path: 'members',
        resolve:{
          special:ProfileDataService
        },
        loadChildren: () => import('../members/members.module').then( m => m.MembersPageModule)
      },
      {
        path: 'profile',
        resolve:{
          special:ProfileDataService
        },
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'videos',
        loadChildren: () => import('../videos/videos.module').then( m => m.VideosPageModule)
      },
      
  {
    path: 'photo-viewer/:id',
    resolve: {
      special: AlbumDataResolverService
    },
    loadChildren: () => import('../photo-viewer/photo-viewer.module').then( m => m.PhotoViewerPageModule)
  } ,
  {
    path: 'pdf-viewer/:id',
    resolve: {
      special: AlbumDataResolverService
    },
    loadChildren: () => import('../pdf-viewer/pdf-viewer.module').then( m => m.PdfViewerPageModule)
  },
  {
    path: 'add-relations',
    loadChildren: () => import('../add-relations/add-relations.module').then( m => m.AddRelationsPageModule)
  },
      
  // {
  //   path: 'gallery',
  //   loadChildren: () => import('../gallery/gallery.module').then( m => m.GalleryPageModule)
  // },
      {
        path: '',
        redirectTo: '/tabs/view-articles',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/view-articles',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardPageRoutingModule {}
