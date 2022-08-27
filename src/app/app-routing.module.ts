import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'moblogin',
    loadChildren: () => import('./moblogin/moblogin.module').then( m => m.MobloginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'brideprofile/:id',
    loadChildren: () => import('./brideprofile/brideprofile.module').then( m => m.BrideprofilePageModule)
  },
  {
    path: 'groomprofile/:id',
    loadChildren: () => import('./groomprofile/groomprofile.module').then( m => m.GroomprofilePageModule)
  },
  {
    path: 'steps',
    loadChildren: () => import('./steps/steps.module').then( m => m.StepsPageModule)
  },
  {
    path: 'footer',
    loadChildren: () => import('./footer/footer.module').then( m => m.FooterPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'allprofiles/:gender',
    loadChildren: () => import('./allprofiles/allprofiles.module').then( m => m.AllprofilesPageModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./forgot/forgot.module').then( m => m.ForgotPageModule)
  },
  {
    path: 'preference',
    loadChildren: () => import('./preference/preference.module').then( m => m.PreferencePageModule)
  },
  {
    path: 'packages',
    loadChildren: () => import('./packages/packages.module').then( m => m.PackagesPageModule)
  },
  {
    path: 'basicdetailsform',
    loadChildren: () => import('./basicdetailsform/basicdetailsform.module').then( m => m.BasicdetailsformPageModule)
  },
  {
    path: 'careerandeducationform',
    loadChildren: () => import('./careerandeducationform/careerandeducationform.module').then( m => m.CareerandeducationformPageModule)
  },
  {
    path: 'communicationform',
    loadChildren: () => import('./communicationform/communicationform.module').then( m => m.CommunicationformPageModule)
  },
  {
    path: 'familyform',
    loadChildren: () => import('./familyform/familyform.module').then( m => m.FamilyformPageModule)
  },
  {
    path: 'lifestyleform',
    loadChildren: () => import('./lifestyleform/lifestyleform.module').then( m => m.LifestyleformPageModule)
  },
  {
    path: 'contactus',
    loadChildren: () => import('./contactus/contactus.module').then( m => m.ContactusPageModule)
  },
  {
    path: 'advancesearch',
    loadChildren: () => import('./advancesearch/advancesearch.module').then( m => m.AdvancesearchPageModule)
  },
  {
    path: 'otp/:number/:otp',
    loadChildren: () => import('./otp/otp.module').then( m => m.OtpPageModule)
  },
  {
    path: 'changepassword',
    loadChildren: () => import('./changepassword/changepassword.module').then( m => m.ChangepasswordPageModule)
  },
  {
    path: 'contest',
    loadChildren: () => import('./contest/contest.module').then( m => m.ContestPageModule)
  },
  {
    path: 'uploadphoto',
    loadChildren: () => import('./uploadphoto/uploadphoto.module').then( m => m.UploadphotoPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'searchresult',
    loadChildren: () => import('./searchresult/searchresult.module').then( m => m.SearchresultPageModule)
  },
  {
    path: 'successstory/:story_id',
    loadChildren: () => import('./successstory/successstory.module').then( m => m.SuccessstoryPageModule)
  },
  {
    path: 'photos',
    loadChildren: () => import('./photos/photos.module').then( m => m.PhotosPageModule)
  },
  {
    path: 'interest/:type',
    loadChildren: () => import('./interest/interest.module').then( m => m.InterestPageModule)
  },
  {
    path: 'shortlist/:type',
    loadChildren: () => import('./shortlist/shortlist.module').then( m => m.ShortlistPageModule)
  },
  {
    path: 'contact/:type',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'filter',
    loadChildren: () => import('./filter/filter.module').then( m => m.FilterPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'resetpassword/:number',
    loadChildren: () => import('./resetpassword/resetpassword.module').then( m => m.ResetpasswordPageModule)
  },
  {
    path: 'verifymobilelogin',
    loadChildren: () => import('./verifymobilelogin/verifymobilelogin.module').then( m => m.VerifymobileloginPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./privacy/privacy.module').then( m => m.PrivacyPageModule)
  }, 
  {  

    path: 'franchise',
    loadChildren: () => import('./franchise/franchise.module').then( m => m.FranchisePageModule)
  },
  {
    path: 'filtersearchresult',
    loadChildren: () => import('./filtersearchresult/filtersearchresult.module').then( m => m.FiltersearchresultPageModule)
  },
  {
    path: 'success',
    loadChildren: () => import('./success/success.module').then( m => m.SuccessPageModule)
  },
  {
    path: 'orderdetails',
    loadChildren: () => import('./orderdetails/orderdetails.module').then( m => m.OrderdetailsPageModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then( m => m.OrderPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
