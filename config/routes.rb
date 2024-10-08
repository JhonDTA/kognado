# frozen_string_literal: true

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/*
  get 'service-worker' => 'rails/pwa#service_worker', as: :pwa_service_worker
  get 'manifest' => 'rails/pwa#manifest', as: :pwa_manifest

  # Defines the root path route ("/")
  unauthenticated do
    root 'public#home'
  end

  authenticated :user do
    root 'dashboard#show', as: :authenticated_root
  end

  get 'help', to: 'public#help'
  get 'about', to: 'public#about'
  get 'contact', to: 'public#contact'

  # Defines the routes for the Devise User model
  devise_for :users, controllers: { sessions: 'users/sessions',
                                    registrations: 'users/registrations',
                                    passwords: 'users/passwords',
                                    unlocks: 'users/unlocks',
                                    confirmations: 'users/confirmations' }
end
