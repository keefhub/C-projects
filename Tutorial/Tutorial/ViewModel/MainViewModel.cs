using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.Collections.ObjectModel;

namespace Tutorial.ViewModel
{
    public partial class MainViewModel : ObservableObject
    {
        // ObservableCollection to hold the items
        [ObservableProperty]
        ObservableCollection<string> items = new ObservableCollection<string>();

        // ObservableProperty to hold the text input
        [ObservableProperty]
        string text="";
      

        [RelayCommand]
        private void Add()
        {
            if (string.IsNullOrWhiteSpace(Text))
            {
                return;
            }

            // Add the text to the collection and clear the input
            Items.Add(Text);
            Text = string.Empty;
        }

        [RelayCommand]
        private void Delete(string s)
        {
            if (Items.Contains(s))
            {
                Items.Remove(s);
            }
        }

        [RelayCommand]
        private async Task Tap(string s)
        {
            // Navigate to DetailPage with the item as a parameter
            await Shell.Current.GoToAsync($"{nameof(DetailPage)}?Item={s}");
        }
    }
}
