import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'login/:login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  // },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/password/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/password/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  },
  {
    path: 'pricing',
    loadChildren: () => import('./pages/pricing/pricing.module').then(m => m.PricingModule)
  },
  {
    path: 'video-resources',
    loadChildren: () => import('./pages/video-resources/video-resources.module').then(m => m.VideoResourcesModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./pages/faq/faq.module').then(m => m.FaqModule)
  },
  {
    path: 'contest',
    loadChildren: () => import('./pages/contest/contest.module').then(m => m.ContestModule)
  },
  {
    path: 'email-forms',
    loadChildren: () => import('./pages/email-forms/email-forms.module').then(m => m.EmailFormsModule)
  },
  {
    path: 'learn-and-earn',
    loadChildren: () => import('./pages/learn-and-earn/learn-and-earn.module').then(m => m.LearnAndEarnModule)
  },
  {
    path: 'social-comments',
    loadChildren: () => import('./pages/social-comments/social-comments.module').then(m => m.SocialCommentsModule)
  },
  {
    path: 'sweepstakes',
    loadChildren: () => import('./pages/sweepstakes/sweepstakes.module').then(m => m.SweepstakesModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./pages/contact-us/contact-us.module').then(m => m.ContactUsModule)
  },
  {
    path: 'gallery',
    loadChildren: () => import('./pages/gallery/gallery.module').then(m => m.GalleryModule)
  },
  {
    path: 'blogs',
    loadChildren: () => import('./pages/blogs/blogs.module').then(m => m.BlogsModule)
  },
  {
    path: 'blog-details/:id',
    loadChildren: () => import('./pages/blog-details/blog-details.module').then(m => m.BlogDetailsModule)
  },
  {
    path: 'testimonials',
    loadChildren: () => import('./pages/testimonials/testimonials.module').then(m => m.TestimonialsModule)
  },
  {
    path: 'my-account',
    loadChildren: () => import('./pages/my-account/my-account.module').then(m => m.MyAccountModule)
  },
  {
    path: 'campaign',
    loadChildren: () => import('./pages/campaign/campaign.module').then(m => m.CampaignModule)
  },
  {
    path: 'campaign-contest',
    loadChildren: () => import('./pages/campaign-contest/campaign-contest.module').then(m => m.CampaignCompaniesModule)
  },
  {
    path: 'campaign-email-forms',
    loadChildren: () => import('./pages/campaign-email-forms/campaign-email-forms.module').then(m => m.CampaignEmailFormsModule)
  },
  {
    path: 'campaign-learn-and-earn',
    loadChildren: () => import('./pages/campaign-learn-and-earn/campaign-learn-and-earn.module').then(m => m.CampaignLearnAndEarnModule)
  },
  {
    path: 'campaign-learn-and-earn-faq/:id/:id1/:id2/:id3',
    loadChildren: () => import('./pages/campaign-learn-and-earn-faq/campaign-learn-and-earn-faq.module').then(m => m.CampaignLearnAndEarnFaqModule)
  },
  {
    path: 'campaign-social-comments',
    loadChildren: () => import('./pages/campaign-social-comments/campaign-social-comments.module').then(m => m.CampaignSocialCommentsModule)
  },
  {
    path: 'campaign-sweep-stakes',
    loadChildren: () => import('./pages/campaign-sweep-stakes/campaign-sweep-stakes.module').then(m => m.CampaignSweepStakesModule)
  },
  {
    path: 'campaign-full-view/:id/:id1/:id2/:id3',
    loadChildren: () => import('./pages/campaign-full-view/campaign-full-view.module').then(m => m.CompanyContestModule)
  },
  {
    path: 'campaign-widget-view/:id/:id1/:id2',
    loadChildren: () => import('./pages/campaign-widget-view/campaign-widget-view.module').then(m => m.CampaignWidgetViewModule)
  }, 
  {
    path: 'campaign-lightbox-view/:id/:id1/:id2',
    loadChildren: () => import('./pages/campaign-lightbox-view/campaign-lightbox-view.module').then(m => m.CampaignLightboxViewModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./pages/payment/payment.module').then(m => m.paymentModule)
  },
  {
    path: 'subscription/:id',
    loadChildren: () => import('./pages/subscription/subscription.module').then(m => m.VideoResourcesModule)
  },
  {
    path: 'contest-fullview-gallary/:id',
    loadChildren: () => import('./pages/contest-fullview-gallary/contest-fullview-gallary.module').then(m => m.ContestFullviewGallaryModule)
  },
  {
    path: 'contest-fullview-gallary',
    loadChildren: () => import('./pages/contest-fullview-gallary/contest-fullview-gallary.module').then(m => m.ContestFullviewGallaryModule)
  },
  {
    path: 'contest-view-entry/:id/:id1/:id2/:id3',
    loadChildren: () => import('./pages/contest-view-entry/contest-view-entry.module').then(m => m.ContestViewEntryModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}